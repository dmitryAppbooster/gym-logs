import { Menu, Button, Text, rem, Burger, MenuProps } from "@mantine/core";
import { ButtonAddNewExercise } from "../../form-new-exercise";
import { useDisclosure } from "@mantine/hooks";

const MENU_ITEMS = {
  addNewExercise: <ButtonAddNewExercise />,
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

      <Menu.Dropdown>
        {menuItems.map((menuItem) => (
          <Menu.Item>{MENU_ITEMS[menuItem]}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
