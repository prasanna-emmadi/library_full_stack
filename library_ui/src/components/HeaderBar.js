import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const HeaderBar = () => {
  const { loggedIn } = useAuthContext();

  let navItems = NAV_ITEMS;
  if (loggedIn) {
    const createBook = {
      label: "CreateBook",
      href: "/createbook",
    };
    navItems = [...NAV_ITEMS, createBook];
  }

  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Box>
          <Text>Library</Text>
        </Box>
        <Spacer />
        <HStack spacing={4}>
          {navItems.map((item, index) => (
            <Box key={index}>
              <Link to={item.href}>{item.label}</Link>
            </Box>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Register",
    href: "/register",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Logout",
    href: "/logout",
  },
];

export default HeaderBar;
