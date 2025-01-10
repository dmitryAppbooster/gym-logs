import { newTrainingSessionStore } from "@/entities/trainings-session";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

export const ButtonNewTrainingSession = () => {
  const { startTraining } = newTrainingSessionStore;
  const navigate = useNavigate();

  const handleStartTrainingSession = () => {
    console.log("HERE")
    navigate("new-training-session");
    startTraining();
  };

  return (
    <Button
      variant="transparent"
      size="compact-md"
      color="dark"
      onClick={handleStartTrainingSession}
    >
      Новая тренировка
    </Button>
  );
};
