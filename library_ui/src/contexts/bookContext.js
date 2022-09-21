import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  editBook,
} from "./bookApiRequests";

const BookContext = createContext({});

export const BookProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [books, setBooks] = useState([]);

  const doGetAllBooks = async () => {
    try {
      const books = await getAllBooks(token);
      setBooks(books);
      return books;
    } catch (e) {
      throw e;
    }
  };

  const doGetBook = async (title) => {
    try {
      const book = await getBook(token, title);
      return book;
    } catch (e) {
      throw e;
    }
  };

  const doEditBook = async (bookData) => {
    try {
      const book = await editBook(token, bookData);
      return book;
    } catch (e) {
      throw e;
    }
  };

  const doCreateBook = async (bookData) => {
    try {
      await createBook(token, bookData);
      return true;
    } catch (e) {
      throw e;
    }
  };

  const doDeleteBook = async (id) => {
    try {
      const book = await deleteBook(token, id);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    doGetAllBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        getAllBooks: doGetAllBooks,
        getBook: doGetBook,
        createBook: doCreateBook,
        deleteBook: doDeleteBook,
        editBook: doEditBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("Book Context is not created");
  }
  return context;
};
