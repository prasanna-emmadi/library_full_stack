import axios from "axios";
import { getAuthHeader } from "./authHeader";

const URL = "http://localhost:3001/user";

export const tryRegister = async (username, password) => {
  try {
    return await axios.post(URL + "/register", { username, password });
  } catch (e) {
    throw new Error("Error in Login");
  }
};

export const tryLogin = async (username, password) => {
  console.log("login in userApiRequest");
  try {
    const response = await axios.post(
      URL + "/login",
      { username, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log({ loginApiResponse: response });
    return response;
  } catch (e) {
    console.log("error in tryLogin", e);
    throw new Error("Error in Login");
  }
};

export const tryLogout = async (token) => {
  try {
    return await axios.post(URL + "/logout", { token });
  } catch (e) {
    throw new Error("Error in Logout");
  }
};

export const refreshToken = async (token) => {
  try {
    const authHeader = getAuthHeader(token);
    return await axios.get(URL + "/refreshtoken", authHeader);
  } catch (e) {
    throw new Error("Error in refresh token");
  }
};
