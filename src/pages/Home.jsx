import { ErrorMessage } from "../components/ErrorMessage";
import { useGetPosts, PostList } from "../features/post";
import { Box, Container, Heading, Skeleton } from "@radix-ui/themes";

const Home = () => {
  const { posts, isLoading, error } = useGetPosts();

  return (
    <>
      <Box>
        <Container size={"4"}>
          <Heading size={{ initial: "8", md: "9" }} mb={"4"}>
            Latest
          </Heading>
          <Skeleton loading={isLoading}>
            {error ? <ErrorMessage error={error} /> : null}
            <PostList posts={posts} />
          </Skeleton>
        </Container>
      </Box>
    </>
  );
};

export default Home;
