import React, { useState } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = props => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login: loginHandler, logout: logoutHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;