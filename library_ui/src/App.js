import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
      <BookProvider>
        <HeaderBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/editbook/:id" element={<BookForm />} />
          <Route path="/createbook" element={<BookForm />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/" element={<AllBooks />} />
        </Routes>
      </BookProvider>
    </Router>
  );
}

export default App;
