import React, { useState } from "react";
import { ILayoutProps } from "../utility/interfaces/ui";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: ILayoutProps) => {
  const tokenData = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(tokenData);
  const userIsLoggedIn = !!token;
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const loginHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
