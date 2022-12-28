import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''

const initialAuthState = {
  token: initialToken,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      console.log(action, state)
      if (action && action.payload) {
              localStorage.setItem('token', action.payload.token);
              state.token = action.payload.token;
            } else {
              alert('Something Went Wrong')
            }
    },
    logout(state) {
      state.token = '';
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

// import React, { useState, useEffect, useCallback } from "react";


// const AuthContext = React.createContext({
//   token: '',
//   login: () => {},
//   logout: () => {},
// });


// export const AuthContextProvider = (props) => {
//   const [isLogIn, setIsLogin] = useState(false);
//   const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
//   const [token, setToken] = useState(initialToken);

//   const logoutHandler = useCallback(() => {
//     setIsLogin(false);
//     setToken('')
//     localStorage.removeItem("token");
//   }, []);

//   const loginHandler = (data) => {
//     if (data && data.token) {
//       setIsLogin(true)
//       localStorage.setItem('token', data.token);
//       setToken(data.token);
//     } else {
//       alert('Something Went Wrong')
//     }
//   };

//   const contextValue = {
//     token: token,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
