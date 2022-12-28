import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useHttp from "../../hook/use-http";
import { getAllMatches } from "../../lib/Api";
import { useSelector } from "react-redux";
import NoDataFound from "../noDataFound/NoDataFound";
import classes from "./AllMatches.module.css";
import DateTimePicker from "./DateTimePicker";
import LoadingSpinner from "../UI/LoadingSpinner";
import { format } from "date-fns";


const AllMatches = () => {
  const [editableCol, setEditableCol] = useState('')

  const {
    sendRequest,
    status,
    data: allMatches,
    error,
  } = useHttp(getAllMatches, true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token]);

  if (error) {
    return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
  }

  if (status === "completed" && !allMatches) {
    return <NoDataFound link='matchDetails'/>;
  }

  if (status === 'pending') {
    return <div className="centered focused" style={{'textAlign': 'center'}}><LoadingSpinner/></div>;
  }

  const handleUpdatePlayer = (id) => {
    setEditableCol(id)
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Team</th>
          <th>Schedule</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allMatches &&
          allMatches.map((listValue, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>
                  {listValue.team.length > 0 && (
                    <span>
                      {" "}
                      {listValue.team[0].teamName}{" "}
                      <span className={classes.bold}> Vs </span>
                      {listValue.team[1].teamName}
                    </span>
                  )}
                </td>
                <td>{(format(new Date(listValue.time), "yyyy/MM/dd hh:mm:ss:aa"))}</td>
                <td>
                  {(editableCol === listValue._id )&& <DateTimePicker date={listValue.time} onCancel={handleUpdatePlayer} token={token} id={listValue._id}/>}
                  {!(editableCol === listValue._id )&& (
                    <button
                      type="button"
                      className={classes.button}
                      onClick={() => handleUpdatePlayer(listValue._id) }
                    >
                      Edit
                    </button>
                   )} 
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default AllMatches;
