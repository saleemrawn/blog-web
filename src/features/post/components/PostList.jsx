import { Link } from "react-router";
import { PostCategories } from "../";
import { CommentCount } from "../../comment";
import { format } from "date-fns";
import { Box, Flex, Text, Badge, Link as RadixLink } from "@radix-ui/themes";

const PostDate = ({ postDate }) => {
  return <Text size={"1"}>{format(postDate, "do MMM yyyy")}</Text>;
};

const PostCard = ({ post }) => {
  return (
    <>
      <Flex direction={"column"} gap={"2"}>
        <PostDate postDate={post?.createdAt} />

        <RadixLink weight={"bold"} color="gray" highContrast asChild>
          <Link className="post-link" to={`/posts/${post?.id}`}>
            {post?.title}
          </Link>
        </RadixLink>

        <Flex
          direction={{ initial: "column", sm: "row" }}
          justify={{ initial: "start", sm: "between" }}
          align={{ initial: "start", sm: "center" }}
          gap={"4"}
        >
          <PostCategories categories={post?.categories} />
          <CommentCount postId={post?.id} />
        </Flex>
      </Flex>
    </>
  );
};

export function PostList({ posts }) {
  return (
    <>
      <Flex direction={"column"}>
        {posts.map((post) => (
          <Box key={post?.id} className="post-list-item" py={"4"}>
            <PostCard post={post} />
          </Box>
        ))}
      </Flex>
    </>
  );
}
