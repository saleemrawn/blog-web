import { useParams } from "react-router";
import { useGetPostById } from "../";
import {
  useGetComments,
  useGetCommentsCount,
  useDeleteComment,
  CommentForm,
  CommentsList,
} from "../../comment";
import { ErrorMessage } from "../../../components/ErrorMessage";
import {
  Box,
  Container,
  Heading,
  Skeleton,
  Spinner,
  Text,
} from "@radix-ui/themes";

export const Post = () => {
  const { postId } = useParams();
  const {
    post,
    isLoading: isPostLoading,
    error: postError,
  } = useGetPostById(postId);
  const {
    comments,
    isLoading: isCommentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useGetComments(postId);
  const {
    count: commentsCount,
    isLoading: isCommentsCountLoading,
    error: commentsCountError,
    refetch: refetchCommentsCount,
  } = useGetCommentsCount(postId);
  const {
    deleteComment,
    isLoading: isDeleteCommentLoading,
    error: commentDeleteError,
  } = useDeleteComment();

  const handleCommentDelete = async (commentId) => {
    await deleteComment({ postId, commentId });
    refetchComments();
    refetchCommentsCount();
  };

  const isLoading =
    isPostLoading || isCommentsLoading || isCommentsCountLoading;

  if (postError) {
    return <ErrorMessage error={postError} />;
  }

  return (
    <>
      <title>{`${post?.title} | The Blog`}</title>

      <Box>
        <Container size={"4"}>
          <Box mb={"6"}>
            <Skeleton loading={isLoading}>
              <Heading size={{ initial: "6", sm: "8" }} mb="6">
                {post?.title}
              </Heading>
            </Skeleton>

            <Skeleton loading={isLoading}>
              <Text>{post?.content}</Text>
            </Skeleton>
          </Box>

          <Skeleton loading={isLoading}>
            <Box>
              <CommentsList
                comments={comments}
                commentsCount={commentsCount}
                onCommentCreated={() => {
                  refetchComments();
                  refetchCommentsCount();
                }}
                onCommentDelete={handleCommentDelete}
              />
            </Box>
          </Skeleton>
        </Container>
      </Box>
    </>
  );
};
