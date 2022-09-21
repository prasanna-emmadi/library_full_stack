import { Box, HStack, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { useBookContext } from "../contexts/bookContext";
import BookForm from "./BookForm";

const Book = ({ book, index, onClick }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" onClick={() => onClick(index)}>
      <Heading fontSize="xl">{book.title}</Heading>
      <Text mt={4}>{book.author}</Text>
    </Box>
  );
};

const AllBooks = () => {
  const { loggedIn } = useAuthContext();
  const { books, getAllBooks } = useBookContext();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (loggedIn && books.length === 0) {
      getAllBooks();
    }
  }, [loggedIn, books, getAllBooks]);

  if (!loggedIn) {
    return <p>You are not loggedIn. Please login.</p>;
  }

  const onClick = (index1) => {
    setIndex(index1);
  };

  console.log("here 1");

  if (!books || books.length === 0) {
    return <p>No books available</p>;
  }

  console.log("here 2");

  const showBookForm = index !== -1;

  return (
    <HStack spacing="24px">
      <List>
        {books.map((book, index) => {
          return (
            <ListItem key={index}>
              <Book book={book} index={index} onClick={onClick} />
            </ListItem>
          );
        })}
      </List>
      {showBookForm ? <BookForm book={books[index]} index={index} /> : null}
    </HStack>
  );
};

export default AllBooks;
