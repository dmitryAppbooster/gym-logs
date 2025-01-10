import type { TrainingSession } from "@/entities/trainings-session";

export type NewTrainingSession = Pick<
  TrainingSession,
  "startedAt" | "exercises"
>;
