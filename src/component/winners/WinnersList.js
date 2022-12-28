import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useHttp from "../../hook/use-http";
import { getAllMatches } from "../../lib/Api";
import { useSelector } from "react-redux";
import NoDataFound from "../noDataFound/NoDataFound";
import classes from "./WinnersList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import { format } from "date-fns";

const WinnersList = () => {
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
    return (
      <p className="centered focused" style={{ textAlign: "center" }}>
        {error + " Please Try After SomeTime"}
      </p>
    );
  }

  if (status === "completed" && !allMatches) {
    return <NoDataFound link="matchDetails" />;
  }

  if (status === "pending") {
    return (
      <div className="centered focused" style={{ textAlign: "center" }}>
        <LoadingSpinner />
      </div>
    );
  }

  const updateScore = (id) => {
    console.log(id);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Team</th>
          <th>Time</th>
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
                <td>
                  {format(new Date(listValue.time), "yyyy/MM/dd hh:mm:ss:aa")}
                </td>
                <td>
                  {listValue.status === "onGoing" && (
                    <p className={classes.p}>onGoing Match</p>
                  )}
                  {listValue.status === "upComing" && (
                    <p className={classes.p}> UpComing Match</p>
                  )}
                  {listValue.status === "previous" && (
                    <p className={classes.p}> Previous Match</p>
                  )}
                </td>
                <td>
                  {listValue.status === "onGoing" && (
                    <div className={classes.actions}>
                      <button
                        type="button"
                        className={classes.button}
                        style={{'margin-right': '1rem'}}
                        onClick={() => updateScore(listValue.team[0]._id)}
                      >
                        A
                      </button>
                      <button
                        type="button"
                        className={classes.button}
                        onClick={() => updateScore(listValue.team[1]._id)}
                      >
                        B
                      </button>
                    </div>
                  )} 
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default WinnersList;