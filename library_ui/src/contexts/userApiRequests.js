import axios from "axios";

const URL = "http://localhost:3001/user";

export const register = async (username, password) => {
  try {
    await axios.post(URL + "/register", { username, password });
    return true;
  } catch (e) {
    throw new Error("Error in Login");
  }
};

export const login = async (username, password) => {
  try {
    await axios.post(URL + "/login", { username, password });
    return true;
  } catch (e) {
    throw new Error("Error in Login");
  }
};

export const logout = async (token) => {
  try {
    await axios.post(URL + "/logout", { token });
    return true;
  } catch (e) {
    throw new Error("Error in Logout");
  }
};

export const refreshToken = async (token) => {
  try {
    const newToken = await axios.get(URL + "/refreshtoken", { token });
    return newToken;
  } catch (e) {
    throw new Error("Error in refresh token");
  }
};
