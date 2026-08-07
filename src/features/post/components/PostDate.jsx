import { format } from "date-fns";
import { Text } from "@radix-ui/themes";

const PostDate = ({ postDate }) => {
  return postDate ? (
    <Text size={"1"}>{format(postDate, "do MMM yyyy")}</Text>
  ) : null;
};

export { PostDate };
