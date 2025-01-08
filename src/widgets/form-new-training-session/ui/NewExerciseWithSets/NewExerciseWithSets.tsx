import { exercisesStore } from "@/entities/exercise";
import { ExerciseWithSets } from "@/entities/trainings-session";
import { Button, Group, Select, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { observer } from "mobx-react-lite";

type NewSetRecordProps = {
  trainingSessionId: string;
};

export const NewExerciseWithSets = observer(
  ({ trainingSessionId }: NewSetRecordProps) => {
    const form = useForm<
      Omit<ExerciseWithSets, "createdAt" | "updatedAt" | "id">
    >({
      mode: "uncontrolled",
      initialValues: {
        trainingSessionId,
        exerciseId: "",
        sets: [],
      },

      validate: {
        trainingSessionId: (value) => {
          if (!value) {
            return "Упражнение должно принадлежать тренировачной сессии";
          }
        },

        exerciseId: (value) => {
          if (value.trim().length === 0) {
            return "Обязательно к заполнению";
          }
        },
      },
    });

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      form.validate();

      if (!form.isValid()) return;

      console.log("ADD EXERCISE");
    };

    return (
      <Stack>
        <Group onSubmit={handleSubmit} component={"form"} align="center">
          <Select
            label="Упражнение"
            data={exercisesStore.allExercisesIdsForSelect}
            searchable
            key={form.key("exerciseId")}
            {...form.getInputProps("exerciseId")}
          />
          <Button type="submit">Добавить урпжнение</Button>
        </Group>
      </Stack>
    );
  }
);
