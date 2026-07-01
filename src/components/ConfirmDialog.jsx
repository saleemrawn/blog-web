import { Button, AlertDialog, Flex } from "@radix-ui/themes";

export const ConfirmDialog = ({
  title,
  description,
  buttonText,
  buttonSize,
  onClick,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="outline" size={buttonSize} color="gray" highContrast>
          {buttonText}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onClick} variant="solid" color="gray" highContrast>
              {buttonText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
