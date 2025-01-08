import { trainingSessionStore } from "@/entities/trainings-session/model/trainingSession";
import { CardTrainingSession } from "@/widgets/card-training-session";
import { Container } from "@mantine/core";
import { observer } from "mobx-react-lite";

export const TrainingSessions = observer(() => {
  return (
    <Container component={"ul"}>
      {trainingSessionStore.trainingSessions
        .slice()
        .reverse()
        .map((trainingSession) => (
          <CardTrainingSession
            key={trainingSession.id}
            trainingSession={trainingSession}
          />
        ))}
    </Container>
  );
});
