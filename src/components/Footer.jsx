import { Box, Text } from "@radix-ui/themes";

const Copyright = () => {
  const date = new Date();
  return <Text>&#169; {date.getFullYear()} The Blog</Text>;
};

export const Footer = () => {
  return (
    <footer>
      <Box py={"4"}>
        <Copyright />
      </Box>
    </footer>
  );
};
