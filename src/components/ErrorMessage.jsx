import { Box, Flex, Text, Callout } from "@radix-ui/themes";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <Callout.Root color="red" size={{ initial: "2", md: "3" }}>
      <Callout.Text>
        {error?.message} {error?.code ? `(${error?.code})` : ""}
      </Callout.Text>
    </Callout.Root>
  );
};

export { ErrorMessage };
