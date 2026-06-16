import { useParams } from "react-router";
import { useGetComments } from "../hooks/useComment";
import { Flex, Heading, Text, Em } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";

const CommentCard = ({ comment }) => {
  return (
    <>
      <Flex
        gap={"1"}
        direction={"column"}
        py={"4"}
        className="comment-list-item"
      >
        <Text>{comment.content}</Text>

        <Flex gap={"3"}>
          <Text size={"1"} weight={"bold"}>
            {comment.author.fullName}
          </Text>
          <Text size={"1"}>
            {formatDistanceToNow(comment.createdAt, {
              includeSeconds: true,
              addSuffix: true,
            })}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export const CommentsList = ({ comments }) => {
  return (
    <>
      <Heading as="h3">Comments</Heading>
      <Flex direction={"column"}>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Flex>
    </>
  );
};
