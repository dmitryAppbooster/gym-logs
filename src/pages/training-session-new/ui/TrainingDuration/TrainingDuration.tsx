import { useState, useEffect, memo } from "react";
import { Text, Flex } from "@mantine/core";

// Функция для вычисления времени, прошедшего с момента начала тренировки
const calculateDuration = (startedAt: string) => {
  const startTime = new Date(startedAt);
  const currentTime = new Date();
  const diff = currentTime.getTime() - startTime.getTime(); // Разница в миллисекундах

  const hours = Math.floor(diff / (1000 * 60 * 60)); // часы
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // минуты
  const seconds = Math.floor((diff % (1000 * 60)) / 1000); // секунды

  return `${hours}ч ${minutes}м ${seconds}с`;
};

interface TrainingDurationProps {
  startedAt: string;
}

export const TrainingDuration = memo(({ startedAt }: TrainingDurationProps) => {
  const [duration, setDuration] = useState(calculateDuration(startedAt));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDuration(calculateDuration(startedAt)); // Обновляем продолжительность каждую секунду
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startedAt]);

  return (
    <Flex>
      <Text>Продолжительность тренировки:</Text>
      <Text>{duration}</Text>
    </Flex>
  );
});
