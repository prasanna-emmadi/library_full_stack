import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const Logout = () => {
  const [error, setError] = useState(false);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await logout();
      setError(false);
      navigate("/");
    } catch (e) {
      setError(true);
    }
  };
  return <Button onClick={onClick}>Logout</Button>;
};

export default Logout;
