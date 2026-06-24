import { useState } from "react";
import { Link } from "react-router";
import { useAuthContext } from "../";
import { useCreateUser } from "../../user";
import { Form } from "radix-ui";
import {
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  Callout,
} from "@radix-ui/themes";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useAuthContext();
  const { createUser, isLoading, error, resetError } = useCreateUser();

  const serverError = error?.data?.errors;
  const hasServerError = Boolean(serverError);

  return (
    <>
      <Heading size={{ initial: "8", md: "9" }} mb={"4"}>
        Sign-Up
      </Heading>

      {hasServerError ? (
        <Flex direction={"column"} gap={"3"} mt={"6"} mb={"4"}>
          {serverError.map((err) => {
            return (
              <Callout.Root color="red" key={err.msg}>
                <Callout.Text>{err.msg}</Callout.Text>
              </Callout.Root>
            );
          })}
        </Flex>
      ) : null}

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
            createUser({ firstName, lastName, username, password });
          }}
        >
          <Form.Field
            className="FormField"
            name="firstName"
            serverInvalid={hasServerError}
          >
            <Flex direction={"column"} mb={"2"}>
              <Form.Label className="FormLabel">First name</Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="Input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    resetError();
                    setFirstName(e.target.value);
                  }}
                  disabled={isLoading}
                  required
                />
              </Form.Control>

              <Form.Message className="FormMessage" match="valueMissing">
                Required
              </Form.Message>
            </Flex>
          </Form.Field>

          <Form.Field
            className="FormField"
            name="firstName"
            serverInvalid={hasServerError}
          >
            <Flex direction={"column"} mb={"2"}>
              <Form.Label className="FormLabel">Last name</Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="Input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    resetError();
                    setLastName(e.target.value);
                  }}
                  disabled={isLoading}
                  required
                />
              </Form.Control>

              <Form.Message className="FormMessage" match="valueMissing">
                Required
              </Form.Message>
            </Flex>
          </Form.Field>

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
                Required
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
                Required
              </Form.Message>
            </Flex>
          </Form.Field>

          <Form.Submit asChild>
            <Button size={{ md: "3" }} color="gray" highContrast>
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </Form.Submit>
        </Form.Root>
      )}
    </>
  );
};
