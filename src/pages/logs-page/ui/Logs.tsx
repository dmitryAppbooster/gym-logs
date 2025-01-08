import { trainingSessionStore } from "@/entities/trainings-session/model/trainingSession";
import { Container } from "@mantine/core";
import { observer } from "mobx-react-lite";

export const Logs = observer(() => {
  return (
    <Container component={"ul"}>
      {trainingSessionStore.trainingSessions.map((trainingSession) => (
        <li key={trainingSession.id}>{JSON.stringify(trainingSession)}</li>
      ))}
    </Container>
  );
});
