import { Link } from "react-router";
import { useGetPosts } from "../";
import { CommentCount } from "../../comment";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Box, Flex, Link as RadixLink, Skeleton } from "@radix-ui/themes";

const PostCard = ({ post, isLoading }) => {
  return (
    <>
      <Flex direction={"column"} gap={"2"}>
        <Skeleton loading={isLoading}>
          <RadixLink weight={"bold"} color="gray" highContrast asChild>
            <Link className="post-link" to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </RadixLink>
          <CommentCount postId={post.id} />
        </Skeleton>
      </Flex>
    </>
  );
};

export function PostList() {
  const { posts, isLoading, error } = useGetPosts();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <Flex direction={"column"}>
        {posts.map((post) => (
          <Box key={post.id} className="post-list-item" py={"4"}>
            <PostCard post={post} isLoading={isLoading} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
