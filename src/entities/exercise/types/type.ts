import { ALL_EXERCISES } from "../const/exercises";

export type ExistedMuscle =
  (typeof ALL_EXERCISES)[number]["muscleGroups"][number]["name"];

export type MuscleGroup = {
  name: ExistedMuscle;
  emphasis: number;
};

export type NewExercise = {
  name: string;
  muscleGroups: MuscleGroup[];
  imageUrl?: string;
  videoUrl?: string;
  techniqueDetails?: string;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroups: MuscleGroup[];
  imageUrl?: string;
  videoUrl?: string;
  techniqueDetails?: string;
};
