import { PostList } from "../features/post";
import { Box, Container, Heading } from "@radix-ui/themes";

const Home = () => {
  return (
    <>
      <Box>
        <Container size={"4"}>
          <Heading size={{ initial: "8", md: "9" }} mb={"4"}>
            Latest
          </Heading>
          <PostList />
        </Container>
      </Box>
    </>
  );
};

export default Home;
