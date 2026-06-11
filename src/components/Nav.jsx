import { useAuthContext } from "../features/auth/context/AuthContext";
import { useLogout } from "../features/auth/hooks/useAuth";
import { Link } from "react-router";
import { Button, Flex, Spinner, Text, Container, Box, Strong } from "@radix-ui/themes";
import { ConfirmDialog } from "./ConfirmDialog";

const Greeting = ({ fullName }) => {
  return (
    <Box display={{ initial: "none", xs: "block" }} mr={"4"}>
      <Text>
        <Strong>Hello, {fullName}</Strong>
      </Text>
    </Box>
  );
};

const LoggedOutLinks = () => {
  return (
    <>
      <Button variant="outline" size={{ md: "3" }} color="gray" highContrast asChild>
        <Link to={"/login"}>Login</Link>
      </Button>

      <Button size={{ md: "3" }} color="gray" highContrast asChild>
        <Link to={"/sign-up"}>Sign-Up</Link>
      </Button>
    </>
  );
};

const LoggedInLinks = ({ fullName, onLogout }) => {
  return (
    <>
      <Greeting fullName={fullName} />
      <ConfirmDialog
        title={"Logout"}
        description={"Are you sure you want to logout?"}
        buttonText={"Logout"}
        onClick={onLogout}
      />
    </>
  );
};

export const Nav = () => {
  const { user, isLoggedIn, isLoading } = useAuthContext();
  const { logout } = useLogout();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <nav>
      <Flex gap={"2"} align={"center"}>
        {isLoggedIn ? <LoggedInLinks fullName={user?.fullName} onLogout={logout} /> : <LoggedOutLinks />}
      </Flex>
    </nav>
  );
};
