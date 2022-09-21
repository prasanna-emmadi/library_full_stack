import { useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useBookContext } from "../contexts/bookContext";

const InputComponent = ({ book, setBook, type, bookKey }) => {
  const onChange = (e) => {
    setBook({ ...book, [bookKey]: e.target.value });
  };

  return <Input onChange={onChange} type={type} />;
};

// based on parameter use the correct approach
const BookForm = (props) => {
  const { createBook, editBook, deleteBook } = useBookContext();
  const [error, setError] = useState(false);
  const [book, setBook] = useState(props.book);

  const doCreateBook = async () => {
    // create
    try {
      await createBook(book);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const onSave = async () => {
    // create
    try {
      await editBook(book, props.index);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const onDelete = async () => {
    // create
    try {
      await deleteBook(book.title);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // update
    await doCreateBook();
  };

  const errorText = "Error in CRUD book";

  return (
    <form onSubmit={onSubmit}>
      <VStack>
        <FormControl isRequired>
          <FormLabel>Tilte</FormLabel>
          <InputComponent
            type="text"
            book={book}
            setBook={setBook}
            bookKey="title"
            value={book.title}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <InputComponent
            type="text"
            book={book}
            setBook={setBook}
            bookKey="description"
            value={book.description}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Author</FormLabel>
          <InputComponent
            type="text"
            book={book}
            setBook={setBook}
            bookKey="author"
            value={book.author}
          />
        </FormControl>
        <ButtonGroup gap="4">
          <Button type="submit">Save New</Button>
          <Button onClick={onSave}>Save</Button>
          <Button onClick={onDelete}>Delete</Button>
        </ButtonGroup>
        {error ? <p>{errorText}</p> : null}
      </VStack>
    </form>
  );
};

export default BookForm;
