export type WorkingSet = {
  id: string;
  exerciseId: string;
  weight: number; // Вес, поднятый в подходе
  repetitions: number; // Количество повторений в подходе
  createdAt: string; // Дата создания подхода
  updatedAt: string; // Дата последнего обновления подхода
};

export type ExerciseWithSets = {
  trainingSessionId: string;
  exerciseId: string;
  sets: WorkingSet[];
};

export type TrainingSession = {
  id: string; // Идентификатор тренировки
  date: string; // Дата тренировки (когда она состоялась)
  exercises: ExerciseWithSets[]; // Массив упражнений, выполненных на тренировке
  createdAt: string; // Дата создания тренировки
  updatedAt: string; // Дата последнего обновления тренировки
};
