import { Link } from "react-router";
import { CommentCount } from "../../comment";
import { Box, Flex, Link as RadixLink } from "@radix-ui/themes";

const PostCard = ({ post }) => {
  return (
    <>
      <Flex direction={"column"} gap={"2"}>
        <RadixLink weight={"bold"} color="gray" highContrast asChild>
          <Link className="post-link" to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </RadixLink>
        <CommentCount postId={post.id} />
      </Flex>
    </>
  );
};

export function PostList({ posts }) {
  return (
    <>
      <Flex direction={"column"}>
        {posts.map((post) => (
          <Box key={post.id} className="post-list-item" py={"4"}>
            <PostCard post={post} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
