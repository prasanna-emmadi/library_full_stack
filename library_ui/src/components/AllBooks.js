import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useBookContext } from "../contexts/bookContext";

const Book = ({ book }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{book.title}</Heading>
      <Text mt={4}>{book.author}</Text>
    </Box>
  );
};

const AllBooks = () => {
  const { loggedIn } = useAuthContext();
  const { books, getAllBooks } = useBookContext();

  useEffect(() => {
    if (loggedIn) {
      getAllBooks();
    }
  }, [loggedIn, getAllBooks]);

  if (!loggedIn) {
    return <p>You are not loggedIn. Please login.</p>;
  }

  console.log("here 1");

  if (!books || books.length === 0) {
    return <p>No books available</p>;
  }

  console.log("here 2");

  return (
    <List>
      {books.map((book, index) => {
        const to = "/book/" + index;
        return (
          <ListItem key={index}>
            <Link to={to}>
              <Book book={book} />
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default AllBooks;
