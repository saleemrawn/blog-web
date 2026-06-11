import { Button, AlertDialog, Flex } from "@radix-ui/themes";

export const ConfirmDialog = ({ title, description, buttonText, onClick }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="outline" size={{ md: "3" }} color="gray" highContrast>
          {buttonText}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" size={{ md: "3" }}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onClick} variant="solid" size={{ md: "3" }} color="gray" highContrast>
              {buttonText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
