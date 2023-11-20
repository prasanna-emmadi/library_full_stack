import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.error("Error in logout")
    }
  };
  return <Button onClick={onClick}>Logout</Button>;
};

export default Logout;
