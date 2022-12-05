import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import classes from './NoDataFound.module.css';

const NoDataFound = () => {
  const authCtx = useContext(AuthContext);
  let isLoggedIn = authCtx.isLoggedIn;
 

  console.log(isLoggedIn)
  return (
    <div className={classes.noData}>
      <p>No pages found!</p>
      {!isLoggedIn && <Link className='btn' to='/login'>
        Login
      </Link>}
      {isLoggedIn && <Link className='btn' to='/playersList'>
        Players List
      </Link>}

    </div>
  );
};

export default NoDataFound;
