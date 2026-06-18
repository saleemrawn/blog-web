import { Box, Flex, Text } from "@radix-ui/themes";

const ERROR_MESSAGES = {
  ERR_NETWORK: "Unable to connect to server.",
  ECONNABORTED: "Request timed out. Please try again.",
  ETIMEDOUT: "Request timed out. Please try again.",
};

const getErrorCode = (error) => {
  if (error.response) {
    return error.response?.status;
  }

  return error.code ?? "Unknown error";
};

const getErrorMessage = (error) => {
  if (error.response) {
    return error.response?.data?.message;
  }

  return (
    ERROR_MESSAGES[error.code] ??
    "Oops, something went wrong. Please try again later."
  );
};

export const ErrorMessage = ({ error }) => {
  if (!error) return null;

  const errorCode = getErrorCode(error);
  const errorMessage = getErrorMessage(error);

  return (
    <Box>
      <Flex direction={"column"} gap={"2"} role="alert">
        <Text size={"6"} weight={"bold"}>
          {errorMessage}
        </Text>
        <Text>{errorCode}</Text>
      </Flex>
    </Box>
  );
};
