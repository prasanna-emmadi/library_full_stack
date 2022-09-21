import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const emptyUser = {
  username: "",
  password: "",
};

const InputComponent = ({ user, setUser, type, userKey }) => {
  const onChange = (e) => {
    setUser({ ...user, [userKey]: e.target.value });
  };

  return <Input onChange={onChange} type={type} />;
};

const RegisterForm = () => {
  const { register } = useAuthContext();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user.username, user.password);
      setUser(emptyUser);
      setError(false);
      navigate("/login");
    } catch (e) {
      setError(true);
    }
  };

  const errorText =
    "Error in Register please try with different username and password";

  return (
    <form onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <InputComponent
          type="text"
          user={user}
          setUser={setUser}
          userKey="username"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputComponent
          type="text"
          user={user}
          setUser={setUser}
          userKey="password"
        />
      </FormControl>
      <Button type="submit">Register</Button>
      {error ? <p>{errorText}</p> : null}
    </form>
  );
};

export default RegisterForm;
