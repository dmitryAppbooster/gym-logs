import { Flex, Stack, Text } from "@mantine/core";
import { NewTrainingSessionStore } from "../model/newTrainingSession";
import { TrainingDuration } from "./TrainingDuration/TrainingDuration";

export const NewTrainingSession = () => {
  const newTrainingSession = new NewTrainingSessionStore();

  return (
    <Stack component={"main"}>
      <Text>TrainingSession</Text>
      <Flex>
        <Text>дата наала:</Text>
        <Text>{newTrainingSession.startedAt}</Text>
      </Flex>
      <TrainingDuration startedAt={newTrainingSession.startedAt} />
    </Stack>
  );
};
