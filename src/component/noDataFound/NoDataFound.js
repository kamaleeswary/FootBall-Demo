import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './NoDataFound.module.css';

const NoDataFound = (props) => {

  const token = useSelector((state) => state.auth.token);

  let isLoggedIn = token ? true : false;

  const link = props.link;
 

  console.log(isLoggedIn)
  return (
    <div className={classes.noData}>
      <p>No Data found!</p>
      {!isLoggedIn && <Link className='btn' to='/login'>
        Login
      </Link>}
      {isLoggedIn && <Link className='btn' to={`/${link}`}>
        Players List
      </Link>}

    </div>
  );
};

export default NoDataFound;
