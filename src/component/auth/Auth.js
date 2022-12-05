import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { login } from "../../lib/Api";
import AuthContext from "../../store/AuthContext";
import TableContext from "../../store/TableContext";

import classes from "./Auth.module.css";

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const tableCtx = useContext(TableContext)
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { sendRequest, status, error } = useHttp(login);

  const fnameInputRef = useRef();
  const lnameInputRef = useRef();

  let enteredEmail;
  let enteredPassword;
  let enteredFname;
  let enteredLname;

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState('male');
  const [captain, setIsCaptain] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    authCtx.isSignUp();
  };

  const genderChange = (e) => {
    setGender(e.target.value);
  }

  const captainChange = () => {
    setIsCaptain(!captain);
  }

  const submitHandler = (event) => {
    event.preventDefault();
  
    if (!isLogin) {
       enteredFname = fnameInputRef.current.value;
       enteredLname = lnameInputRef.current.value;
    }
    enteredEmail = emailInputRef.current.value;
    enteredPassword = passwordInputRef.current.value; 

    const playerData = {
        // name: enteredFname + enteredLname,
        email: enteredEmail,
        // gender: gender,
        // isCaptain: captain,
        // team: '',
        // id: Math.random(), 
        password: enteredPassword,
    }
    sendRequest(playerData);
    // if (status === 'pending') {
    //  alert('something wrong')
    // }
  
    // if (status === 'completed') {
    //   history.push('/playersList')

    // }
    // authCtx.login(playerData, isLogin);
    // if (!isLogin) {
    //     tableCtx.addPlayers(playerData);
    // }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.fname}>
            <div className={classes.control + " col-md-6"}>
              <label htmlFor="fname"> First Name</label>
              <input type="fname" id="fname" required ref={fnameInputRef} />
            </div>
            <div className={classes.control + " col-md-6"}>
              <label htmlFor="lname"> Last Name</label>
              <input type="lname" id="lname" required ref={lnameInputRef} />
            </div>
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email"> Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {!isLogin && (
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
            <div className="col-xs-6  form-group form-check">
              <input
                type="checkbox"
                id="isCaptain"
                className="form-check-input"
                onChange={captainChange}
                value={captain}
              />
              <label
                htmlFor="isCaptain"
                className={classes.checkbox + " form-check-label"}
              >
                isCaptain
              </label>
            </div>
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
