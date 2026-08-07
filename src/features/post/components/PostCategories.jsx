import { Flex, Badge } from "@radix-ui/themes";

const PostCategories = ({ categories }) => {
  return categories?.length > 0 ? (
    <Flex direction={"row"} gap={"4px"}>
      {categories?.map((category) => (
        <Badge key={category.id} color="gray" variant="outline" highContrast>
          {category?.name}
        </Badge>
      ))}
    </Flex>
  ) : null;
};

export { PostCategories };
