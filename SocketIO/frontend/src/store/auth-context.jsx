import React from "react";

const AuthContext = React.createContext({
  user: {},
  signup: (signupData) => {},
  login: (loginData) => {},
  logout: () => {},
});

export default AuthContext;
