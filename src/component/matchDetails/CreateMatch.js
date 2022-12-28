import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { createMatch } from "../../lib/Api";
import { useSelector } from 'react-redux';
import NoDataFound from "../noDataFound/NoDataFound";
import LoadingSpinner from "../UI/LoadingSpinner";
import MatchDetails from "./MatchDetails";
import classes from  "./CreateMatch.module.css"
import { useHistory } from "react-router-dom";

const CreateMatch = () => {

    const images = [
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_WM6mx1ViU824UfaLExCk-pJIC3ITPb4kg&usqp=CAU",
            no: 1,
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVlnzjwsEET1ILECT87npfWWCGLXjOnCnNTQ&usqp=CAU",
            no: 2,
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTST7rLZbI4OcZm1M2t4lG9MmdNFAT-xTiNPA&usqp=CAU",
            no: 3
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYV3d20jALckBRqwgRFeAYldwpoPeakhEgSw&usqp=CAU",
            no: 4
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8N-2M9ZwXyysmn1EN4RO3Pe_GEl7yppMK7g&usqp=CAU",
            no: 5
        }
    ];

    const history = useHistory();

    const {
        sendRequest,
        status,
        data: matchDetails,
        error,
      } = useHttp(createMatch, true);
    
      const token = useSelector((state) => state.auth.token);
    
      useEffect(() => {
        sendRequest(token);
      }, [sendRequest, token])
    
      if (error) {
        return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
      }

      if (status === 'pending') {
        return <div className="centered focused" style={{'textAlign': 'center'}}><LoadingSpinner/></div>;
      }
    
      if (status === "completed" && (!matchDetails)) {
        return <NoDataFound link='playersList'/>;
      }
      const handlNavigation = () => {
        history.push('/matchDetails/allMatches')
      }

      return (
        <section>
             <div>
        <button
          type="button"
          className={classes.createbtn + ' ' + classes.button}
          onClick={handlNavigation}
        >
          All Matches
        </button>
      </div>
       { matchDetails && matchDetails.team && <MatchDetails matchData={matchDetails.team}  images={images} /> }
       {matchDetails && matchDetails.message && (
        <section>
           <div className={classes.align}><p>{matchDetails.message + ' Please Try After SomeTime.' }</p></div>
           <div className={classes.align}> <LoadingSpinner /></div>
        </section>
      )}
       </section>
      )
}

export default CreateMatch;