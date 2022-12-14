import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./authContext";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  editBook,
} from "./api/bookApiRequests";

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
      const response = await getBook(token, title);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  const doEditBook = async (bookData) => {
    try {
      const response = await editBook(token, bookData);
      const updatedBooks = books.map((book) => {
        if (book._id !== bookData._id) {
          return book;
        }
        return bookData;
      });
      console.log({ updatedBooks });
      setBooks(updatedBooks);
      return response;
    } catch (e) {
      throw e;
    }
  };

  const doCreateBook = async (bookData) => {
    try {
      const response = await createBook(token, bookData);
      // add to the existing book
      console.log({ response });
      setBooks([...books, response]);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  const doDeleteBook = async (title) => {
    try {
      await deleteBook(token, title);
      const newBooks = books.filter((book) => book.title !== title);
      setBooks(newBooks);
    } catch (e) {
      throw e;
    }
  };

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
