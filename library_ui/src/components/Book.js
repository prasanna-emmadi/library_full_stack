import { FormLabel, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../contexts/bookContext";

const Book = () => {
  const { id } = useParams();
  const { books } = useBookContext();
  const index = parseInt(id);
  const book = books[index];
  if (!books[index]) return <p>Book not available</p>;
  // on refresh should show the same book
  // perhaps use useEffect to get the id stored in the local storage
  // or refetch
  return (
    <>
      <FormLabel>Title</FormLabel>
      <Text>{book.title}</Text>
      <FormLabel>Description</FormLabel>
      <Text>{book.description}</Text>
      <FormLabel>Author</FormLabel>
      <Text>{book.author}</Text>
    </>
  );
};

export default Book;
