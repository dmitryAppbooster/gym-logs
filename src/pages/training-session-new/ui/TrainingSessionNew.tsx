import { Button, Flex, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { TrainingDuration } from "./TrainingDuration/TrainingDuration";
import { newTrainingSessionStore } from "@/entities/trainings-session";

export const NewTrainingSession = observer(() => {
  const { startedAt, resumeTraining, pauseTraining } = newTrainingSessionStore;

  return (
    <Stack component={"main"}>
      <Text>TrainingSession</Text>
      <Flex>
        <Text>дата наала:</Text>
        <Text>{startedAt}</Text>
      </Flex>
      <Flex>
        <Text>Продолжительность тренировки:</Text>
        <TrainingDuration />
      </Flex>
      <Flex>
        <Button onClick={pauseTraining}>⏸️</Button>
        <Button onClick={resumeTraining}>►</Button>
      </Flex>
    </Stack>
  );
});
