import { WorkingSet } from "@/entities/trainings-session";
import { Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { observer } from "mobx-react-lite";

export const NewSetRecord = observer(() => {
  const form = useForm<Omit<WorkingSet, "createdAt" | "updatedAt" | "id">>({
    mode: "uncontrolled",
    initialValues: {
      weight: 10,
      repetitions: 10,
    },

    validate: {
      weight: (value) => {
        if (Number.isNaN(value)) {
          return "Должно быть числом";
        }
        if (value <= 0) {
          return "Не должно быть меньше или равно 0";
        }

        return null;
      },

      repetitions: (value) => {
        if (Number.isNaN(value)) {
          return "Должно быть числом";
        }
        if (value <= 0) {
          return "Не должно быть меньше или равно 0";
        }

        return null;
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    form.validate();

    if (!form.isValid()) return;

    console.log("ADD SET");
  };

  return (
    <Group onSubmit={handleSubmit} component={"form"} align="center">
      <NumberInput
        label="Вес (кг)"
        key={form.key("weight")}
        min={0}
        max={400}
        suffix=" кг."
        {...form.getInputProps("weight")}
      />
      <NumberInput
        label="Кол-во повторений"
        key={form.key("repetitions")}
        min={0}
        {...form.getInputProps("repetitions")}
      />
      <Button type="submit">Добавить сет</Button>
    </Group>
  );
});
