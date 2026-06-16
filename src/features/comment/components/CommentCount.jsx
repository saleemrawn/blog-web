import { useGetCommentsCount } from "../";
import { Text, Em, Spinner } from "@radix-ui/themes";

export const CommentCount = ({ postId }) => {
  const { count, isLoading, error } = useGetCommentsCount(postId);

  if (isLoading) return <Spinner />;

  return (
    <Text size={"1"}>
      {count} {count === 1 ? "comment" : "comments"}
    </Text>
  );
};
