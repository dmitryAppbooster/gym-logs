import {
  TrainingSession,
  trainingSessionStore,
} from "@/entities/trainings-session";
import { FormNewExerciseWithSets } from "@/widgets/form-new-exercises-with-sets";
import { Card, CloseButton, Group, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

type CardTrainingSessionProps = {
  trainingSession: TrainingSession;
};

export const CardTrainingSession = observer(
  ({ trainingSession }: CardTrainingSessionProps) => {
    const { deleteTriningSession } = trainingSessionStore;

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text>{trainingSession.date}</Text>
        <Text>День груди</Text>
        <CloseButton
          onClick={() => deleteTriningSession({ id: trainingSession.id })}
        />

        <Card.Section>
          <Group justify="flex-end" mt="md" mb="xs">
            <Stack>
              <Text fw={500}>Дата создания:</Text>
              <Text fw={500}>{trainingSession.createdAt}</Text>
            </Stack>
            <Stack>
              <Text fw={500}>Дата обновления:</Text>
              <Text fw={500}>{trainingSession.updatedAt}</Text>
            </Stack>
          </Group>
        </Card.Section>

        <ul>
          {trainingSession.exercises.map((exerciseWithSets) => {
            return (
              <Stack>
                <Text>{exerciseWithSets.exerciseId}</Text>
                {exerciseWithSets.sets.map((set) => (
                  <div>
                    <li>{set.weight}</li>
                    <li>{set.repetitions}</li>
                  </div>
                ))}
              </Stack>
            );
          })}
        </ul>
        <FormNewExerciseWithSets trainingSessionId={trainingSession.id} />
      </Card>
    );
  }
);
