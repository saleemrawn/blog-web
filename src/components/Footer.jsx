import { Link } from "react-router";
import { useAuthContext } from "../features/auth/context/AuthContext";
import { useLogout } from "../features/auth/hooks/useAuth";
import { Box, Flex, Text, Link as RadixLink } from "@radix-ui/themes";

const Copyright = () => {
  const date = new Date();
  return <Text>&#169; {date.getFullYear()} The Blog</Text>;
};

const FooterLinks = () => {
  const { isLoggedIn, isLoading } = useAuthContext();
  const { logout } = useLogout();

  if (isLoggedIn) {
    return (
      <RadixLink weight={"bold"} color="gray" highContrast asChild>
        <Link className="nav-link" onClick={logout}>
          Logout
        </Link>
      </RadixLink>
    );
  }

  return (
    <Flex gap={"4"}>
      <Box>
        <RadixLink weight={"bold"} color="gray" highContrast asChild>
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </RadixLink>
      </Box>
      <Box>
        <RadixLink weight={"bold"} color="gray" highContrast asChild>
          <Link to={"/sign-up"} className="nav-link">
            Sign-Up
          </Link>
        </RadixLink>
      </Box>
    </Flex>
  );
};

export const Footer = () => {
  return (
    <footer>
      <Flex justify={"between"} py={"4"} align={"center"}>
        <Box>
          <Copyright />
        </Box>
        <Box>
          <FooterLinks />
        </Box>
      </Flex>
    </footer>
  );
};
