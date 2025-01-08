import { Container } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { exercisesStore } from "../../../entities/exercise";

export const Logs = observer(() => {
  return (
    <Container component={"ul"}>
      {exercisesStore.allExercises.map((exercise) => (
        <li>{exercise.name}</li>
      ))}
    </Container>
  );
});
