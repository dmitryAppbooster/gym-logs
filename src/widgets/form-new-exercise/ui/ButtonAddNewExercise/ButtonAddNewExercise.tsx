import { Button, ElementProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormNewExercise } from "../..";

type ButtonAddNewExerciseProps = ElementProps<"button">;

export const ButtonAddNewExercise = ({
  ...rest
}: ButtonAddNewExerciseProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant="transparent"
        size="compact-md"
        color="dark"
        onClick={open}
        {...rest}
      >
        Добавить новое упражнение
      </Button>

      <Modal opened={opened} onClose={close} title="Новое упражнение" centered>
        <FormNewExercise close={close} />
      </Modal>
    </>
  );
};
