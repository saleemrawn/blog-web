import { Flex, Badge } from "@radix-ui/themes";

const PostCategories = ({ categories }) => {
  return (
    <Flex direction={"row"} gap={"4px"}>
      {categories?.map((category) => (
        <Badge key={category.id} color="gray" variant="outline" highContrast>
          {category?.name}
        </Badge>
      ))}
    </Flex>
  );
};

export { PostCategories };
