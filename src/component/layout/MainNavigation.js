import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/AuthContext'

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  let isLoggedIn = token ? true : false;
 
  const logoutHandler = () => {
    dispatch(authActions.logout())
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
                Login
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
              <NavLink to="/pointsTable" activeClassName={classes.active}>
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
