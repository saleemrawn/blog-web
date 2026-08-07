import { useParams } from "react-router";
import { useGetPostById, PostCategories, PostDate } from "../";
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
  Flex,
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
              <Heading
                size={{ initial: "6", sm: "8" }}
                mb="5"
                dangerouslySetInnerHTML={{ __html: post?.title }}
              />

              <Flex
                align={"center"}
                gap={"4"}
                pt={"5"}
                mb={"6"}
                className="post-meta-data"
              >
                <PostDate postDate={post?.createdAt} />
                <PostCategories categories={post?.categories} />
              </Flex>
            </Skeleton>

            <Skeleton loading={isLoading}>
              <Text dangerouslySetInnerHTML={{ __html: post?.content }} />
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
