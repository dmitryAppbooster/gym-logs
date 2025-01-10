import { newTrainingSessionStore } from "@/entities/trainings-session";
import { Text } from "@mantine/core";
import { observer } from "mobx-react-lite";

// Функция для вычисления времени, прошедшего с момента начала тренировки
// const calculateDuration = (startedAt: string) => {
//   const startTime = new Date(startedAt);
//   const currentTime = new Date();
//   const diff = currentTime.getTime() - startTime.getTime(); // Разница в миллисекундах

//   const hours = Math.floor(diff / (1000 * 60 * 60)); // часы
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // минуты
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000); // секунды

//   return `${hours}ч ${minutes}м ${seconds}с`;
// };

export const TrainingDuration = observer(() => {
  const { duration } = newTrainingSessionStore;

  return <Text>{duration}</Text>;
});
