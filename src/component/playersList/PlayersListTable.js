import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { getAllPlayers } from "../../lib/Api";
import NoDataFound from "../noDataFound/NoDataFound";
import classes from "./PlayersListTable.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const PlayersListTable = () => {
  const history = useHistory();

  const {
    sendRequest,
    status,
    data: loadedPlayers,
    error,
  } = useHttp(getAllPlayers, true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token]);

  if (error) {
    return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
  }

  if (status === 'pending') {
    return <div className="centered focused" style={{'textAlign': 'center'}}><LoadingSpinner/></div>;
  }

  if (
    status === "completed" &&
    (!loadedPlayers || loadedPlayers.length === 0)
  ) {
    return <NoDataFound link='playersList'/>;
  }

  const handleUpdatePlayer = (id, name) => {
    history.push(`/playersList/${name}/${id}`);
  };

  const handleCreatePlayer = () => {
    history.push('/playersList/create')
  }

  return (
    <section>
      <div>
        <button
          type="button"
          className={classes.createbtn + ' ' + classes.button}
          onClick={handleCreatePlayer}
        >
          Create New Player
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Selected</th>
            <th>isCaptain</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {loadedPlayers &&
            loadedPlayers.map((listValue, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{listValue.player_Name}</td>
                  <td>{listValue.gender === "M" ? "Male" : "Female"}</td>
                  <td>{listValue.selected}</td>
                  <td>{listValue.captain ? "Yes" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      className={classes.button}
                      onClick={() =>
                        handleUpdatePlayer(listValue._id, listValue.player_Name)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </section>
  );
};
export default PlayersListTable;
