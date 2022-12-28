import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { login } from "../../lib/Api";
import { authActions } from '../../store/AuthContext'
import NoDataFound from "../noDataFound/NoDataFound";
import { useDispatch } from 'react-redux';


import classes from "./Auth.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { sendRequest, status, data: response, error } = useHttp(login);

  useEffect(() => {
      if (status === "completed") {
        dispatch(authActions.login(response));
        setTimeout(() => {
          history.push("/playersList");
        }, 100);
      }
  }, [status, response, dispatch, history]);

  let enteredEmail;
  let enteredPassword;

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    enteredEmail = emailInputRef.current.value;
    enteredPassword = passwordInputRef.current.value;
    setIsLoading(false);
    const playerData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    sendRequest(playerData);
    if (error) {
      return <p className="centered focused" style={{'textAlign': 'center'}}>{error + ' Please Try After SomeTime'}</p>;
    }

    if (status === "pending") {
      return <div className="centered">
        <LoadingSpinner />
      </div>;
    }

    
    if (status === "completed" && !response) {
      setIsLoading(false);
      return <NoDataFound link='login'/>;
    }
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
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

        <div className={classes.actions}>
          <button button="submit">Login</button>
          {isLoading && <p className={classes.msg}>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default Auth;
