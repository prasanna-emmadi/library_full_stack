import { useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../contexts/bookContext";

const emptyBook = {
  title: "",
  description: "",
  author: "",
};

const InputComponent = ({ book, setBook, type, bookKey }) => {
  const onChange = (e) => {
    setBook({ ...book, [bookKey]: e.target.value });
  };

  return <Input onChange={onChange} type={type} />;
};

// based on parameter use the correct approach
const BookForm = () => {
  const { createBook, editBook, deleteBook } = useBookContext();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [book, setBook] = useState(emptyBook);

  const isEditMode = id !== undefined;

  const doCreateBook = async () => {
    // create
    try {
      await createBook(book);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const doEditBook = async () => {
    // create
    try {
      await editBook(book);
      setError(false);
    } catch (e) {
      setError(true);
    }
  };

  const onSave = async () => {
    // create
    try {
      await editBook(book);
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
    if (isEditMode) {
      await doEditBook();
    } else {
      await doCreateBook();
    }
  };

  const errorText = isEditMode
    ? "Error in updating book"
    : "Error in creating book";

  return (
    <form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>Tilte</FormLabel>
        <InputComponent
          type="text"
          book={book}
          setBook={setBook}
          bookKey="title"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <InputComponent
          type="text"
          book={book}
          setBook={setBook}
          bookKey="description"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Author</FormLabel>
        <InputComponent
          type="text"
          book={book}
          setBook={setBook}
          bookKey="author"
        />
      </FormControl>
      <ButtonGroup gap="4">
        <Button type="submit">Submit</Button>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onDelete}>Delete</Button>
      </ButtonGroup>
      {error ? <p>{errorText}</p> : null}
    </form>
  );
};

export default BookForm;
