import axios from "axios";
import { getAuthHeader } from "./authHeader";
const URL = "http://localhost:3001/book/";

export const getAllBooks = async (token) => {
  try {
    const authHeader = getAuthHeader(token);
    const response = await axios.get(URL, authHeader);
    return response.data;
  } catch (e) {
    throw new Error("Error in books get");
  }
};

export const getBook = async (token, id) => {
  try {
    const authHeader = getAuthHeader(token);
    const response = await axios.get(URL + id, authHeader);
    return response.data;
  } catch (e) {
    throw new Error("Error in books get");
  }
};

export const createBook = async (token, bookData) => {
  try {
    const authHeader = getAuthHeader(token);
    const response = await axios.post(URL, bookData, authHeader);
    return response.data;
  } catch (e) {
    throw new Error("Error in book create");
  }
};

export const editBook = async (token, bookData) => {
  try {
    const authHeader = getAuthHeader(token);
    const response = await axios.put(URL, bookData, authHeader);
    return response.data;
  } catch (e) {
    throw new Error("Error in book edit");
  }
};

export const deleteBook = async (token, id) => {
  try {
    const authHeader = getAuthHeader(token);
    await axios.delete(URL + id, authHeader);
  } catch (e) {
    throw new Error("Error in book delete");
  }
};
