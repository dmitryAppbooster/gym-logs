import { Button, ElementProps, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormNewTrainingSession } from "../FormNewTrainingSession/FormNewTrainingSession";

type ButtonAddNewTrainingSessionProps = ElementProps<"button">;

export const ButtonAddNewTrainingSession = ({
  ...rest
}: ButtonAddNewTrainingSessionProps) => {
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
        Добавить тренировку
      </Button>

      <Modal opened={opened} onClose={close} title="Новое упражнение" centered>
        <FormNewTrainingSession close={close} />
      </Modal>
    </>
  );
};
