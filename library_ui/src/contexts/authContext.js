import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken, tryRegister, tryLogin } from "./api/userApiRequests";

const AuthContext = createContext(undefined);
const TOKEN_IDENTIFIER = "LIB_TOKEN";

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem(TOKEN_IDENTIFIER);
    // perform a refresh token request to backend here,
    // as we cannot know for sure if this token is valid or not at this point
    // This is intended for init-load, to not force the user to relogin
    // if he only refreshes the webpage.
    if (localStorageToken) {
      const checkToken = async () => {
        const response = await refreshToken(localStorageToken);

        if (response.status === 401) {
          logout();
        } else {
          const token = response.data.token;
          setLoggedIn(true);
          setToken(token);
          localStorage.setItem(TOKEN_IDENTIFIER, token);
        }
      };
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    setLoggedIn(false);
    setToken("");
    navigate("/login");
    localStorage.removeItem(TOKEN_IDENTIFIER);
  };

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
        localStorage.setItem(TOKEN_IDENTIFIER, token);
        setToken(token);
        setLoggedIn(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (e) {
      console.log("error in login");
      console.error(e);
      throw e;
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
  if (!context) {
    throw new Error("Auth context not created");
  }
  return context;
};
