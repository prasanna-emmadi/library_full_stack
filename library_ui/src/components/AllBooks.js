import { List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useBookContext } from "../contexts/bookContext";

const AllBooks = () => {
  const { loggedIn } = useAuthContext();
  const { books } = useBookContext();

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
          <ListItem>
            <Link to={to}>book.name</Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default AllBooks;
