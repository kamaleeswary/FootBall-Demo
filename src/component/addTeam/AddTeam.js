import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { buildTeam } from "../../lib/Api";
import { useSelector } from 'react-redux';
import FilteredTeams from "../filteredTeams/FilteredTeams";
import classes from "./AddTeam.module.css";
import TeamList from "./TeamList";

const AddTeam = () => {
  const [gender, setGender] = useState("null");
  const [filteredTeam, setFilteredTeam] = useState("null");
  const [filteredPlayersList, setFilteredPlayersList] = useState(false);
  // const [hasError, sethasError] = useState(false);

  const history = useHistory();

  const {
    sendRequest,
    status,
    error,
  } = useHttp(buildTeam, true);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (filteredTeam !== "null" && gender !== "null") {
      setFilteredPlayersList(true);
    }
  }, [filteredTeam, gender, sendRequest]);

  if (error) {
    return <p className="centered focused" style={{'textAlign': 'center'}}>{error + 'Please Try After SomeTime'}</p>;
  }


  if (status === 'completed') {
    alert('Random Player Successfully Added into the Team')
  }


  const genderChange = (e) => {
    setGender(e.target.value);
  };

  const handleTeamSelection = (value) => {
    setFilteredTeam(value);
  };

  const handleNavigation = () => {
    history.push("/playersList");
  };

  const handleTeamformation = (e) => {
    e.preventDefault();
    if (filteredTeam !== 'null') {
    const req = {
      gender: gender,
      teamId: filteredTeam,
      token: token
    }
    sendRequest(req);
  } else {
    alert('Please Select One Team')
  }
  };
  return (
    <section className={classes.auth}>
     <div>
      <h1>Team Formation</h1>
      <form onSubmit={handleTeamformation}>
        <div className={classes.control + " " + classes.box}>
          <span className={classes.dLabel}> Teams</span>
          <TeamList filteredTeam={handleTeamSelection}/>
        </div>
        <div className={classes.gender}>
          <div className={classes.align + " col-xs-6"}>
            <label htmlFor="gender">Gender:</label>
            <div className={classes.radiobtn}>
              <div className={classes.mgender}>
                <input
                  id="male"
                  type="radio"
                  value="M"
                  name="gender"
                  required
                  onChange={genderChange}
                />
                <label htmlFor="male">Male</label>
              </div>

              <div className={classes.f}>
                <input
                  id="female"
                  type="radio"
                  value="F"
                  name="gender"
                  required
                  onChange={genderChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
        </div>
        {filteredPlayersList && <FilteredTeams token={token}/>}

        <div className={classes.actions}>
          <button type="submit"> Random</button>
          <button type="button" onClick={handleNavigation}>
            Cancel
          </button>
        </div>
      </form>
      </div>

    </section>
  );
};

export default AddTeam;
