export type WorkingSet = {
  id: string;
  weight: number; // Вес, поднятый в подходе
  repetitions: number; // Количество повторений в подходе
  createdAt: string; // Дата создания подхода
  updatedAt: string; // Дата последнего обновления подхода
};

export type ExerciseWithSets = {
  exerciseId: string;
  sets: WorkingSet[];
};

export type TrainingSession = {
  id: string; // Идентификатор тренировки
  exercises: ExerciseWithSets[]; // Массив упражнений, выполненных на тренировке
  startedAt: string;
  createdAt: string; // Дата создания тренировки
  updatedAt: string; // Дата последнего обновления тренировки
};
