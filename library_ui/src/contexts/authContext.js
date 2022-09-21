import { createContext, useContext, useEffect, useState } from "react";
import { getAuthHeader } from "./api/authHeader";
import {
  refreshToken,
  tryRegister,
  tryLogin,
  tryLogout,
} from "./api/userApiRequests";

const AuthContext = createContext(undefined);
const TOKEN_IDENTIFIER = "LIB_TOKEN";

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem(TOKEN_IDENTIFIER);
    console.log({ localStorageToken });
    // perform a refresh token request to backend here,
    // as we cannot know for sure if this token is valid or not at this point
    // This is intended for init-load, to not force the user to relogin
    // if he only refreshes the webpage.
    if (localStorageToken) {
      const checkToken = async () => {
        const resp = await refreshToken(localStorageToken);
        if (resp.status === 401) {
          logout();
        } else {
          setToken(resp.token);
          localStorage.setItem("MYLIB_TOKEN", resp.token);
        }
      };
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = async (username, password) => {
    try {
      await tryRegister(username, password);
    } catch (e) {
      throw e;
    }
  };
  const login = async (username, password) => {
    try {
      const response = await tryLogin(username, password);
      const token = response.data.token;

      if (token) {
        console.log("token received");
        localStorage.setItem(TOKEN_IDENTIFIER, token);
        setToken(token);
        setLoggedIn(true);
      } else {
        console.log("token is null");
        throw new Error("Login failed");
      }
    } catch (e) {
      console.log("error in login");
      console.error(e);
      throw e;
    }
  };
  const logout = async () => {
    const token = localStorage.getItem(TOKEN_IDENTIFIER);
    if (token) {
      try {
        await tryLogout(token);
        setLoggedIn(false);
        setToken("");
        localStorage.setItem(TOKEN_IDENTIFIER, "");
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register: register,
        login: login,
        logout: logout,
        loggedIn: loggedIn,
        token: token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  //console.log("authcontext", context);
  if (!context) {
    throw new Error("Auth context not created");
  }
  return context;
};
