import { Flex, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { newTrainingSessionStore } from "../model/newTrainingSession";
import { TrainingDuration } from "./TrainingDuration/TrainingDuration";

export const NewTrainingSession = observer(() => {
  const { startedAt } = newTrainingSessionStore;

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
    </Stack>
  );
});
