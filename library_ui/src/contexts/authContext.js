import { createContext, useContext, useState } from "react";
import { login, logout, register } from "./userApiRequests";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const doRegister = async (username, password) => {
    try {
      await register(username, password);
    } catch (e) {
      throw e;
    }
  };
  const doLogin = async (username, password) => {
    try {
      const token = await login(username, password);
      localStorage.setItem("token", token);
      setToken(token);
      setLoggedIn(true);
    } catch (e) {
      throw e;
    }
  };
  const doLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logout(token);
        setLoggedIn(false);
        setToken("");
      } catch (e) {
        throw e;
      }
    }
  };
  const doRefreshToken = async () => {
    // some timer based refresh
  };

  // login
  // logout
  // refresh
  // local storage

  return (
    <AuthContext.Provider
      value={{
        register: doRegister,
        login: doLogin,
        logout: doLogout,
        refreshToken: doRefreshToken,
        loggedIn,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context not created");
  }
  return context;
};
