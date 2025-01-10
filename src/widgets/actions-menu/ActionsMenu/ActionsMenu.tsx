import { ButtonNewTrainingSession } from "@/features/training-session";
import { Burger, Menu, MenuProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ButtonAddNewExercise } from "../../form-new-exercise";

const MENU_ITEMS = {
  addNewExercise: <ButtonAddNewExercise />,
  addNewTrainingSession: <ButtonNewTrainingSession />,
};

type ActionsMenuProps = {
  menuTargetClassName: string;
  menuItems: (keyof typeof MENU_ITEMS)[];
} & MenuProps;

export const ActionsMenu = ({
  menuItems,
  menuTargetClassName,
  ...rest
}: ActionsMenuProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Menu
      opened={opened}
      onClose={close}
      onOpen={open}
      shadow="md"
      zIndex={100}
      keepMounted
      {...rest}
    >
      <Menu.Target>
        <Burger
          className={menuTargetClassName}
          opened={opened}
          aria-label="Toggle Actions"
        />
      </Menu.Target>

      <Menu.Dropdown component="ul">
        {menuItems.map((menuItem) => (
          <Menu.Item component="li" key={menuItem}>
            {MENU_ITEMS[menuItem]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
