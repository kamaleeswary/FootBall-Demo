import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableContext from "../../store/TableContext";
// import classes from "./PlayersListTable.module.css";

const PlayersListTable = () => {
    const tableCtx = useContext(TableContext);
    let playersData = tableCtx.playersList;
    const [listOfPlayers, setListofPlayers] = useState(playersData)
    useEffect(() => {
        if (tableCtx.playersList.length > 4) {
            setListofPlayers(playersData);
        }
    }, [tableCtx.playersList.length, playersData])
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
         { listOfPlayers.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{listValue.name}</td>
              <td>{listValue.email}</td>
              <td>{listValue.gender}</td>
              <td>{listValue.team}</td>
            </tr>
          );
        })}
          </tbody>
        </Table>
      );
};
export default PlayersListTable;
