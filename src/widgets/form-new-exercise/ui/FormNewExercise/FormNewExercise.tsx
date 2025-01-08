import { Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useState } from "react";
import {
  ExistedMuscle,
  MUSCLES,
  NewExercise,
  exercisesStore,
} from "../../../../entities/exercise";
import { MuscleGroupSelect } from "./MuscleGroupSelect/MuscleGroupSelect";
import { notifications } from "@mantine/notifications";

type FormNewExerciseProps = {
  close: () => void;
};

export const FormNewExercise = ({ close }: FormNewExerciseProps) => {
  const [muscleGroups, setMuscleGroups] = useState<NewExercise["muscleGroups"]>(
    []
  );

  const form = useForm<NewExercise>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      muscleGroups: [],
      imageUrl: "",
      videoUrl: "",
      techniqueDetails: "",
    },

    validate: {
      name: (value) => {
        if (value.trim().length === 0) {
          return "Обязательно к заполнению";
        }
        if (
          exercisesStore.allExercises.some(
            (exercise) =>
              exercise.name.toLocaleLowerCase() === value.toLocaleLowerCase()
          )
        ) {
          return "Упражнение с таким названием уже существует";
        }
        return null;
      },

      // Валидация групп мышц
      muscleGroups: (value) => {
        if (value.length === 0) {
          return "Должна быть указана хотя бы одна группа мышц";
        }

        let totalEmphasis = 0;

        for (let i = 0; i < value.length; i++) {
          const muscleGroup = value[i];

          if (muscleGroup.name.trim().length === 0) {
            return "Обязательно нужно указать название мышцы";
          }

          if (muscleGroup.emphasis <= 0 || muscleGroup.emphasis > 100) {
            return "Процент включения в работу мышечной группы должен быть от 0 до 100";
          }

          totalEmphasis += muscleGroup.emphasis;
        }

        if (totalEmphasis !== 100) {
          return "Сумма всех процентов должна быть равна 100%";
        }

        return null;
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.setFieldValue("muscleGroups", muscleGroups);
    form.validate();

    if (!form.isValid()) return;

    exercisesStore.addExercise(form.getValues());
    notifications.show({
      title: "Готово!",
      message: "Упражнение добавлено в общий список",
      color: "lime",
    });
    close();
  };

  const handleSelectMuscleGroup = useCallback(
    (muscleGroup: ExistedMuscle, index: number) => {
      setMuscleGroups((prev) => {
        if (!prev[index]) {
          prev[index] = {
            name: muscleGroup as ExistedMuscle,
            emphasis: 100,
          };
        } else {
          prev[index].name = muscleGroup as ExistedMuscle;
        }

        return [...prev];
      });
    },
    []
  );

  const handleChangeMuscleGroupEmphasis = useCallback(
    (value: number, index: number) => {
      setMuscleGroups((prev) => {
        prev[index].emphasis = +value;
        return [...prev];
      });
    },
    []
  );

  const handleRemoveMuscleGroup = useCallback((index: number) => {
    setMuscleGroups((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const selectedMuscleGroups = muscleGroups.map(
    (muscleGroup) => muscleGroup.name
  );
  const muscleGroupsOptionsForSelect =
    selectedMuscleGroups.length === 0
      ? MUSCLES
      : MUSCLES.filter((muscle) => !selectedMuscleGroups.includes(muscle));

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        withAsterisk
        label="Назваине упражнения"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      {Array.from({ length: muscleGroups.length + 1 }).map((_, index) => (
        <MuscleGroupSelect
          key={muscleGroups[index]?.name || index}
          name={muscleGroups[index]?.name}
          emphasis={muscleGroups[index]?.emphasis}
          optionsForSelect={[
            ...muscleGroupsOptionsForSelect,
            ...(muscleGroups[index]?.name ? [muscleGroups[index]?.name] : []),
          ]}
          index={index}
          isNew={muscleGroups.length === index}
          handleDelete={handleRemoveMuscleGroup}
          handleSelectMuscleGroup={handleSelectMuscleGroup}
          handleChangeMuscleGroupEmphasis={handleChangeMuscleGroupEmphasis}
        />
      ))}
      {form.errors?.muscleGroups && (
        <Text color="red" size="xs" mt="xs">
          {form.errors.muscleGroups}
        </Text>
      )}

      <TextInput
        label="Описание / Технические особенности"
        key={form.key("techniqueDetails")}
        {...form.getInputProps("techniqueDetails")}
      />
      <TextInput
        label="Картинка"
        key={form.key("imageUrl")}
        {...form.getInputProps("imageUrl")}
      />
      <TextInput
        label="Обучающее видео"
        key={form.key("videoUrl")}
        {...form.getInputProps("videoUrl")}
      />

      <Group justify="flex-end" mt="md">
        <Button onClick={close}>Закрыть</Button>
        <Button type="submit">Подтвердить</Button>
      </Group>
    </form>
  );
};
