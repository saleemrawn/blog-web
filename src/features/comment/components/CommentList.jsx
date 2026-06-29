import { useParams, Link } from "react-router";
import { useAuthContext } from "../../auth";
import { formatDistanceToNow } from "date-fns";
import { CommentForm, useGetComments, useDeleteComment } from "../../comment";
import { ConfirmDialog } from "../../../components";
import {
  Flex,
  Box,
  Heading,
  Text,
  Em,
  Button,
  Badge,
  Strong,
} from "@radix-ui/themes";

const CommentCard = ({ comment, isLoggedInUser, onCommentDelete }) => {
  const { postId } = useParams();
  const { deleteComment, isLoading, error } = useDeleteComment();

  const handleDelete = async () => {
    await deleteComment({
      postId: Number(postId),
      commentId: Number(comment.id),
    });
    await onCommentDelete();
  };

  return (
    <>
      <Flex
        gap={"1"}
        direction={"column"}
        py={"4"}
        className="comment-list-item"
      >
        <Text>{comment.content}</Text>

        <Flex justify={"between"} align={"center"}>
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
          {isLoggedInUser ? (
            <ConfirmDialog
              title={"Delete comment"}
              description={"Are you sure you want to delete?"}
              buttonText={"Delete"}
              onClick={handleDelete}
            />
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

const CommentCount = ({ comments }) => {
  return (
    <Box>
      <Badge
        variant="solid"
        radius="full"
        color="gray"
        className="CommentCountBadge"
        highContrast
      >
        <Text>
          <Strong>{comments?.length}</Strong>
        </Text>
      </Badge>
    </Box>
  );
};

export const CommentsList = ({
  comments,
  onCommentCreated,
  onCommentDelete,
}) => {
  const { user, isLoggedIn } = useAuthContext();

  return (
    <>
      <Flex align={"center"} gap={"2"} mb={"3"}>
        <Heading as="h3">Comments</Heading>
        <CommentCount comments={comments} />
      </Flex>

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
        {comments.map((comment) =>
          comment.deletedAt === null ? (
            <CommentCard
              key={comment.id}
              comment={comment}
              isLoggedInUser={comment.authorUserId === user?.id}
              onCommentDelete={onCommentDelete}
            />
          ) : null,
        )}
      </Flex>
    </>
  );
};
