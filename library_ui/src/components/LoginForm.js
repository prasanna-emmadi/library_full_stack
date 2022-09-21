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

const LoginForm = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const navigate = useNavigate();

  //console.log(typeof login);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit");
    try {
      await login(user.username, user.password);
      navigate("/home");
      setUser(emptyUser);
      setError(false);
    } catch (e) {
      console.log("error in login", e);
      setError(true);
    }
  };

  const errorText = "Error in Login please username and password";

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
      <Button type="submit">Login</Button>
      {error ? <p>{errorText}</p> : null}
    </form>
  );
};

export default LoginForm;
