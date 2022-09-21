import { List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useBookContext } from "../contexts/bookContext";

const AllBooks = () => {
  const { books } = useBookContext();

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
