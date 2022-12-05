import { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  let isLoggedIn = authCtx.isLoggedIn;
 

  console.log(isLoggedIn)
  const authState = authCtx.inSignup ? "SignUp" : "Login"

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/login");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Foot Ball</div>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" activeClassName={classes.active}>
                {authState}
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink to="/playersList" activeClassName={classes.active}>
                Players List
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/selectTeam" activeClassName={classes.active}>
                Select Team
              </NavLink>
            </li>
          )}
            {isLoggedIn && (
            <li>
              <NavLink to="/matchDetails" activeClassName={classes.active}>
                Match Details
              </NavLink>
            </li>
          )}
            {isLoggedIn && (
            <li>
              <NavLink to="/winners" activeClassName={classes.active}>
                Points Table
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
