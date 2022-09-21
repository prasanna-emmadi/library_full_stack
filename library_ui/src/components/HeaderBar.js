import { Box, Flex, HStack, Spacer, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HeaderBar = () => {
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
          {NAV_ITEMS.map((item, idx) => (
            <Box key={idx}>
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
