import { newTrainingSessionStore } from "@/entities/trainings-session";
import { Button } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

export const ButtonNewTrainingSession = observer(() => {
  const { startTraining } = newTrainingSessionStore;
  const navigate = useNavigate();

  const handleStartTrainingSession = () => {
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
});
