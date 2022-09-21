import axios from "axios";
const URL = "http://localhost:3001/book/";

export const getAllBooks = async (token) => {
  try {
    const books = await axios.get(URL, { token });
    return books;
  } catch (e) {
    throw new Error("Error in books get");
  }
};

export const getBook = async (token, id) => {
  try {
    const book = await axios.get(URL + id, { token });
    return book;
  } catch (e) {
    throw new Error("Error in books get");
  }
};

export const createBook = async (token, bookData) => {
  try {
    const book = await axios.post(URL, { token, bookData });
    return book;
  } catch (e) {
    throw new Error("Error in book create");
  }
};

export const editBook = async (token, bookData) => {
  try {
    const book = await axios.put(URL, { token, bookData });
    return book;
  } catch (e) {
    throw new Error("Error in book edit");
  }
};

export const deleteBook = async (token, id) => {
  try {
    const book = await axios.delete(URL + id);
    return book;
  } catch (e) {
    throw new Error("Error in book delete");
  }
};
