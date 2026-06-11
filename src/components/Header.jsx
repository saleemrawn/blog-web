import { Link } from "react-router";
import { Box, Flex, Link as RadixLink, Container } from "@radix-ui/themes";
import { Nav } from "./Nav";

const LogoLink = () => {
  return (
    <RadixLink weight={"bold"} size={"6"} color="gray" highContrast asChild>
      <Link to={"/"} className="nav-link">
        The Blog
      </Link>
    </RadixLink>
  );
};

export const Header = () => {
  return (
    <header>
      <Flex justify={"between"} align={"center"} pt={{ md: "2" }}>
        <Box>
          <LogoLink />
        </Box>
        <Box>
          <Nav />
        </Box>
      </Flex>
    </header>
  );
};
