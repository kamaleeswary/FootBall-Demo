import { useRef, useState } from "react";
import useHttp from "../../hook/use-http";
import classes from "./UpdatePlayer.module.css";
import { CUPlayerDetails } from "../../lib/Api";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const UpdatePlayer = () => {
    const history = useHistory();
    const nameInputRef = useRef();
    const params = useParams();
    const token = useSelector((state) => state.auth.token);


    const { playerId, playerName } = params;


    const {
        sendRequest,
        status,
        error,
        data: upadatedPlayers,
      } = useHttp(CUPlayerDetails, true);

      const [gender, setGender] = useState("M");
      const [isCaptain, setIsCaptain] = useState(false);
    
      if (error) {
        return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
      }
    
      if (status === 'completed' && upadatedPlayers) {
        alert('Updated SuccessFully');
      }

  const CUPlayer = (e,action) => {
    e.preventDefault();
    const req = {
        token: token,
        reqObj: {
            gender: gender,
            captain: isCaptain,
            player_Name: nameInputRef.current.value ? nameInputRef.current.value : playerName
        }
    }
    if (action === 'create') {
        req['action'] = 'create';
        sendRequest(req)
    } else {
        req['action'] = 'update';
        req['playerId'] = playerId;
    sendRequest(req);
    }
    setTimeout(() => {
        history.push('/playersList')
      }, 2000);
  };


  const genderChange = (e) => {
    setGender(e.target.value);
  };

  const captainChange = () => {
    setIsCaptain(!isCaptain);
  };

  const handleNavigation = () => {
    history.push('/playersList');
  }

  return (
    <section className={classes.auth}>
    <h1>Update Player Details</h1>
    <form>
        <div className={classes.name}>
          <div className={classes.control}>
            <label htmlFor="name"> Name</label>
            <input type="name" id="fname" ref={nameInputRef} placeholder={playerName}/>
          </div>
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
          <div className="col-xs-6  form-group form-check">
            <input
              type="checkbox"
              id="isCaptain"
              className="form-check-input"
              onChange={captainChange}
              value={isCaptain}
            />
            <label
              htmlFor="isCaptain"
              className={classes.checkbox + " form-check-label"}
            >
              isCaptain
            </label>
          </div>
        </div>
        <div className={classes.actions}>
         { playerName && <button onClick={(e) => CUPlayer(e,'update')}> Update</button>}
         { !playerName && <button onClick={(e) => CUPlayer(e,'create')}>Create</button>}
          <button type="button" onClick={handleNavigation}>
            Cancel
          </button>
        </div>
    </form>
  </section>
  );
};

export default UpdatePlayer;
