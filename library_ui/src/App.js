import { Routes, Route } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import HeaderBar from "./components/HeaderBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import { BookProvider } from "./contexts/bookContext";

function App() {
  return (
    <BookProvider>
      <HeaderBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<AllBooks />} />
      </Routes>
    </BookProvider>
  );
}

export default App;
