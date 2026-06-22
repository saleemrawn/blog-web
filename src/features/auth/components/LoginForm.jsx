import { useLogin } from "../hooks/useAuth";
import { useState } from "react";
import { Form } from "radix-ui";
import { Button, Flex, Heading, Spinner } from "@radix-ui/themes";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, resetError } = useLogin();

  const serverError = error?.data?.message;
  const hasServerError = Boolean(serverError);

  return (
    <>
      <Heading size={{ initial: "8", md: "9" }} mb={"4"}>
        Login
      </Heading>

      <Form.Root
        onSubmit={(event) => {
          event.preventDefault();
          login({ username, password });
        }}
      >
        <Form.Field
          className="FormField"
          name="username"
          serverInvalid={hasServerError}
        >
          <Flex direction={"column"} mb={"2"}>
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

        <Form.Submit asChild>
          <Button size={{ md: "3" }} color="gray" highContrast>
            {isLoading ? <Spinner /> : "Login"}
          </Button>
        </Form.Submit>
      </Form.Root>
    </>
  );
};
