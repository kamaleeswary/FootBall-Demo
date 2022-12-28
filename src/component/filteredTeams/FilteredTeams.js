import { useEffect } from "react";
import useHttp from "../../hook/use-http";
import { getAllPlayers } from "../../lib/Api";
import NoDataFound from "../noDataFound/NoDataFound";
import classes from "./FilteredTeams.module.css";

const FilteredTeams = (props) => {
  const {
    sendRequest,
    status,
    data: loadedPlayers,
    error,
  } = useHttp(getAllPlayers, true);

  const token = props.token; 


  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token]);

  if (error) {
    return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
  }

  if (
    status === "completed" &&
    (!loadedPlayers || loadedPlayers.length === 0)
  ) {
    return <NoDataFound link='selectTeam'/>;
  }

  let index = 0;

  const cards = loadedPlayers && loadedPlayers.map((player, id) => {
    index++
    return (
      <div className={classes.card} key={id} style={{ '--delay': index}}>
        <div className={classes.content + " mb-3"}>
            <div className={classes.img}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png"
                alt="..."
              />
            </div>
           <div className={classes.details}>
           <span className={classes.name}>{player.player_Name}</span>
            <p className="card-text">{player.gender}</p>
           </div>
          </div>
        </div>
    );
  }
  );
  return <section> {loadedPlayers && <div className={classes.wrapper}>{cards}</div>}</section>
};

export default FilteredTeams;
