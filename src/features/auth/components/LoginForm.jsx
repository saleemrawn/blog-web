import { useState } from "react";
import { Form } from "radix-ui";
import { useAuthContext, useLogin } from "../";
import { Text, Button, Flex, Heading, Spinner, Box } from "@radix-ui/themes";
import { Link } from "react-router";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useAuthContext();
  const { login, isLoading, error, resetError } = useLogin();

  const serverError = error?.data?.message;
  const hasServerError = Boolean(serverError);

  return (
    <>
      <Heading size={{ initial: "8", md: "9" }} mb={"4"}>
        Login
      </Heading>

      {isLoggedIn ? (
        <Box mt={"6"}>
          <Text>
            You are already logged in, and can return to{" "}
            <Link to="/">homepage</Link>.
          </Text>
        </Box>
      ) : (
        <Form.Root
          onSubmit={(event) => {
            event.preventDefault();
            login({ username, password });
          }}
        >
          <Flex direction={"column"} gap={"2"}>
            <Form.Field
              className="FormField"
              name="username"
              serverInvalid={hasServerError}
            >
              <Flex direction={"column"} mb={"2"}>
                <Form.Label className="FormLabel">Username</Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="Input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      resetError();
                      setUsername(e.target.value);
                    }}
                    disabled={isLoading}
                    required
                  />
                </Form.Control>

                <Form.Message className="FormMessage" match="valueMissing">
                  Username is required
                </Form.Message>
              </Flex>
            </Form.Field>

            <Form.Field
              className="FormField"
              name="password"
              serverInvalid={hasServerError}
            >
              <Flex direction={"column"} mb={"4"}>
                <Form.Label className="FormLabel">Password</Form.Label>
                <Form.Control asChild>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="Input"
                    placeholder="Password"
                    onChange={(e) => {
                      resetError();
                      setPassword(e.target.value);
                    }}
                    disabled={isLoading}
                    required
                  />
                </Form.Control>

                <Form.Message className="FormMessage" match="valueMissing">
                  Password is required
                </Form.Message>

                {serverError && (
                  <Form.Message
                    className="FormMessage"
                    match="badInput"
                    forceMatch={hasServerError}
                  >
                    {serverError}
                  </Form.Message>
                )}
              </Flex>
            </Form.Field>
          </Flex>

          <Form.Submit asChild>
            <Button size={{ md: "3" }} color="gray" highContrast>
              {isLoading ? <Spinner /> : "Login"}
            </Button>
          </Form.Submit>
        </Form.Root>
      )}
    </>
  );
};
