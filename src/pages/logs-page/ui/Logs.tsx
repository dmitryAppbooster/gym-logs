import { trainingSessionStore } from "@/entities/trainings-session/model/trainingSession";
import { CardTrainingSession } from "@/widgets/card-training-session";
import { Container } from "@mantine/core";
import { observer } from "mobx-react-lite";

export const Logs = observer(() => {
  return (
    <Container component={"ul"}>
      {trainingSessionStore.trainingSessions.map((trainingSession) => (
        <CardTrainingSession
          key={trainingSession.id}
          trainingSession={trainingSession}
        />
      ))}
    </Container>
  );
});
