import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { getAllTeams } from "../../lib/Api";
import { useSelector } from 'react-redux';
import NoDataFound from "../noDataFound/NoDataFound";

const TeamList = (props) => {

  const {
    sendRequest,
    status,
    data: loadedTeams,
    error,
  } = useHttp(getAllTeams, true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token])

  // if (status === 'pending') {
  //   return <p className="centered focused" style={{'textAlign': 'center'}}>Please Try After SomeTime</p>;
  // }

  if (error) {
    return <p className="centered focused" style={{'textAlign': 'center'}}>{error + 'Please Try After SomeTime'}</p>;
  }

  if (status === "completed" && (!loadedTeams || loadedTeams.length === 0)) {
    return <NoDataFound link='selectTeam'/>;
  }


  const handleTeamSelection = (e) => {
    console.log(e.target.value)
    props.filteredTeam(e.target.value)
  };
    return (
        <select onChange={handleTeamSelection}>    
        { loadedTeams && loadedTeams.map((team) => {
           return <option value={team._id} key={team.id} required>
             {team.teamName}
           </option>;
         })
       }
       </select>
    )
}

export default TeamList;