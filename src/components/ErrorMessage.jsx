import { Box, Flex, Text, Callout } from "@radix-ui/themes";
import { getErrorDetails } from "../httpErrors";

export const ErrorMessage = ({ error }) => {
  if (!error) return null;

  const err = getErrorDetails(error);

  return (
    <Callout.Root color="red" size={{ initial: "2", md: "3" }}>
      <Callout.Text>
        {err.code} - {err.message}
      </Callout.Text>
    </Callout.Root>
  );
};
