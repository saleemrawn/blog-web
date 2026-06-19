import { useParams, Link } from "react-router";
import { useAuthContext } from "../../auth";
import { formatDistanceToNow } from "date-fns";
import { CommentForm, useGetComments } from "../../comment";
import { Flex, Heading, Text, Em, Button } from "@radix-ui/themes";

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
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <Heading as="h3" mb={"3"}>
        Comments
      </Heading>
      {isLoggedIn ? (
        <CommentForm onCommentCreated={onCommentCreated} />
      ) : (
        <Flex align={"center"} gap={"2"}>
          <Button size={{ md: "3" }} color="gray" highContrast asChild>
            <Link to={"/sign-up"}>Sign-Up</Link>
          </Button>
          <Text>or</Text>
          <Button
            variant="outline"
            size={{ md: "3" }}
            color="gray"
            highContrast
            asChild
          >
            <Link to={"/login"}>Login</Link>
          </Button>
          <Text>to comment</Text>
        </Flex>
      )}
      <Flex direction={"column"} mt={"4"}>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </Flex>
    </>
  );
};
