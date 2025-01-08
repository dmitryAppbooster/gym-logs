import { CloseButton, Group, NumberInput, Select } from "@mantine/core";
import { memo } from "react";
import { ExistedMuscle } from "../../../../../entities/exercise";
import classes from "./MuscleGroupSelect.module.css";

type MuscleGroupSelectProps = {
  name: ExistedMuscle;
  emphasis: number;
  index: number;
  isNew: boolean;
  optionsForSelect: ExistedMuscle[];

  handleDelete: (index: number) => void;
  handleSelectMuscleGroup: (muscleGroup: ExistedMuscle, index: number) => void;
  handleChangeMuscleGroupEmphasis: (value: number, index: number) => void;
};

export const MuscleGroupSelect = memo(
  ({
    name,
    emphasis,
    index,
    isNew,
    optionsForSelect,

    handleSelectMuscleGroup,
    handleChangeMuscleGroupEmphasis,
    handleDelete,
  }: MuscleGroupSelectProps) => {
    return (
      <Group align="center">
        <Select
          className={classes.muscleGroupsNameSelect}
          label="Выберите группу мышц"
          value={name}
          onChange={(muscleGroup) =>
            handleSelectMuscleGroup(muscleGroup as ExistedMuscle, index)
          }
          data={optionsForSelect}
          searchable
        />
        <NumberInput
          value={emphasis}
          onChange={(value) => handleChangeMuscleGroupEmphasis(+value, index)}
          label="Участие (%)"
          min={0}
          max={100}
          suffix="%"
          defaultValue={100}
          className={classes.emphasisInput}
          disabled={isNew}
        />
        <CloseButton disabled={isNew} onClick={() => handleDelete(index)} />
      </Group>
    );
  }
);
