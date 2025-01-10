import { TrainingSession, trainingSessionStore } from "@/entities/trainings-session";

import { getCurrentDate, getCurrentDateWithOutTime } from "@/shared/libs";
import { Button } from "@mantine/core";
import { randomId } from "@mantine/hooks";

export const ButtonAddTrainingSession = () => {
  const handleCreateNewTrainingSession = () => {
    const newTrainingSession: TrainingSession = {
      id: randomId(),
      date: getCurrentDateWithOutTime(),
      exercises: [],
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    };
    trainingSessionStore.addTriningSession({ newTrainingSession });
  };
  return (
    <Button
      variant="transparent"
      size="compact-md"
      color="dark"
      onClick={handleCreateNewTrainingSession}
    >
      Новая тренировка
    </Button>
  );
};
