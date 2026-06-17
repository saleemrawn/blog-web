import { useParams } from "react-router";
import { Flex, Heading, Text, Em } from "@radix-ui/themes";
import { formatDistanceToNow } from "date-fns";
import { CommentForm, useGetComments } from "../../comment";

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

export const CommentsList = ({ comments, onCommentCreated }) => {
  return (
    <>
      <Heading as="h3" mb={"2"}>
        Comments
      </Heading>
      <CommentForm onCommentCreated={onCommentCreated} />
      <Flex direction={"column"} mt={"4"}>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Flex>
    </>
  );
};
