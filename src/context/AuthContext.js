import { createContext, useContext, useState } from "react";

const StateContext = createContext({
 token: localStorage.getItem("AUTH_TOKEN") || "",
 username: localStorage.getItem("USER_NAME") || "",
 setUserName: () => {},
 setToken: () => {},
});

export const AuthContext = ({ children }) => {
 const [token, _setToken] = useState(localStorage.getItem("AUTH_TOKEN") || "");
 const [username, _setUserName] = useState(
  localStorage.getItem("USER_NAME") || ""
 );
 const setToken = (token) => {
  _setToken(token);
  if (token !== "") {
   localStorage.setItem("AUTH_TOKEN", token);
  } else {
   localStorage.setItem("AUTH_TOKEN", "");
  }
 };
 const setUserName = (username) => {
  _setUserName(username);
  if (username !== "") {
   localStorage.setItem("USER_NAME", username);
  } else {
   localStorage.setItem("USER_NAME", "");
  }
 };
 return (
  <StateContext.Provider
   value={{
    username,
    token,
    setUserName,
    setToken,
   }}
  >
   {children}
  </StateContext.Provider>
 );
};

export const useStateContext = () => useContext(StateContext);
