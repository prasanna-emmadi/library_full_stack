import { Routes, Route } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import Book from "./components/Book";
import BookForm from "./components/BookForm";
import HeaderBar from "./components/HeaderBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";

import { BookProvider } from "./contexts/bookContext";
import { useAuthContext } from "./contexts/authContext";

function App() {
  const { loggedIn } = useAuthContext();
  return (
    <BookProvider>
      <HeaderBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterForm />} />
        {loggedIn ? (
          <Route path="/editbook/:id" element={<BookForm />} />
        ) : null}
        {loggedIn ? <Route path="/createbook" element={<BookForm />} /> : null}
        {loggedIn ? <Route path="/book/:id" element={<Book />} /> : null}
        <Route path="/" element={<AllBooks />} />
      </Routes>
    </BookProvider>
  );
}

export default App;
