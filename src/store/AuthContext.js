import React, { useState, useContext, useEffect, useCallback } from "react";
import TableContext from "./TableContext";


const AuthContext = React.createContext({
  //   token: '',
  isLoggedIn: () => {},
  isAuth: false,
  inSignup: false,
  isSignUp: () => {},
  login: () => {},
  logout: () => {},
});


export const AuthContextProvider = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogin] = useState(false);
  
  let isAuth = localStorage.getItem('token') ? true : false; 
  const tableCtx = useContext(TableContext);
  const playersList = tableCtx.playersList;


  const logoutHandler = useCallback(() => {
    setIsLogin(false);
    localStorage.removeItem("token");
  }, []);

  const loginHandler = (data, loginState) => {
    let noError = false;
    console.log(loginState)
    if (loginState) {
        playersList.map((players) => {
            if (players.email === data.email && players.password === data.password) {
                setIsLogin(true);
                localStorage.setItem('token', players.id)
                noError = true
            }
        })
        if (!noError) {
                alert('please provide valid email and password');      
              }
    } else {
      localStorage.setItem('token', data.id)
        setIsLogin(true);
    }
  };

  const isSignUpHandler = () => {
     setIsSignUp((prevState) => !prevState);
  }

  useEffect(() => {
    if (!isAuth) {
      isAuth = isLogIn;
    }
  }, [isAuth])

  const contextValue = {
    isLoggedIn: isAuth,
    inSignup: isSignUp,
    isSignUp: isSignUpHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
