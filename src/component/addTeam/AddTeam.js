import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TableContext from "../../store/TableContext";
import FilteredTeams from "../filteredTeams/FilteredTeams";
import classes from "./AddTeam.module.css";

const AddTeam = () => {
  const [gender, setGender] = useState('none');
  const [filteredTeam, setFilteredTeam] = useState('none');
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const history = useHistory();
  const tableCtx = useContext(TableContext);

  
  useEffect(() => {
    if (filteredTeam !== 'none' && gender !== 'none') {
      const filteredPlayersList = tableCtx.playersList.filter(palyers => palyers.gender === gender && palyers.team === filteredTeam);
      if (filteredPlayersList.length === 0) {
        alert('No players are matched by the filters');
    }
    setFilteredPlayers(filteredPlayersList);
    }
  },[filteredTeam, gender])

  // const submitHandler = (player) => {
  //   selectedPlayers.push(player);
  // };

  const genderChange = (e) => {
    setGender(e.target.value);
  };   
  
  const handleChange = (e) => {
    setFilteredTeam(e.target.value)
  }

  const handleNavigation = () => {
    history.push('/playersList')
  }
 
  const handleTeamformation = (e) => {
    e.preventDefault();
    console.log(selectedPlayers);
  }
  return (
    <section className={classes.auth}>
      <h1>Team Formation</h1>
      <form onSubmit={handleTeamformation}>
        <div className={classes.control + ' ' + classes.box}>
          <span className={classes.dLabel}> Teams</span>
            <select onChange={handleChange}>
              <option value='Team A'>Team A</option>
              <option value='Team B'>Team B</option>
              <option value='Team C'>Team C</option>
            </select>
        </div>
        <div className={classes.gender}>
          <div className={classes.align + " col-xs-6"}>
            <label htmlFor="gender">Gender:</label>
            <div className={classes.radiobtn}>
              <div className={classes.mgender}>
                <input
                  id="male"
                  type="radio"
                  value="male"
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
                  value="female"
                  name="gender"
                  required
                  onChange={genderChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
        </div>
      {(filteredPlayers) && <FilteredTeams players={filteredPlayers}/>}

        <div className={classes.actions}>
          <button type="submit"> Random</button>
          <button type="button" onClick={handleNavigation}> Cancel</button>
        </div>
      </form>
    </section>
  );
  // <div>
  //   <form>
  //     <div>
  //       <select className="my-select-menu">
  //         <option>Option 1</option>
  //         <option>Option 2</option>
  //         <option>Option 3</option>
  //       </select>
  //       <p>ok</p>
  //     </div>
  //   </form>
  // </div>
};

export default AddTeam;
