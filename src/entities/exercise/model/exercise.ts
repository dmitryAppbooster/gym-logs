import { makeAutoObservable } from "mobx";
import { ALL_EXERCISES } from "../const/exercises";
import type { Exercise, NewExercise } from "../types/type";
import { randomId } from "@mantine/hooks";

const KEY_ALL_EXERCISES = "ALL_EXERCISES";

class ExercisesStore {
  allExercises: Exercise[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    const allExercisesFromStorage = localStorage.getItem(KEY_ALL_EXERCISES);
    if (allExercisesFromStorage) {
      this.allExercises = [
        ...JSON.parse(allExercisesFromStorage),
        ...ALL_EXERCISES,
      ];
    } else {
      this.allExercises = ALL_EXERCISES || [];
    }
  }

  get allExercisesIdsForSelect() {
    return this.allExercises.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }

  addExercise(newExercise: NewExercise) {
    this.allExercises.push({ ...newExercise, id: randomId() });
    localStorage.setItem(KEY_ALL_EXERCISES, JSON.stringify(this.allExercises));
  }

  updateExercise({
    id,
    updatedExercise,
  }: {
    id: string;
    updatedExercise: Partial<NewExercise>;
  }) {
    this.allExercises = this.allExercises.map((exercise) => {
      if (exercise.id === id) {
        exercise = { ...exercise, ...updatedExercise };
      }
      return exercise;
    });
    localStorage.setItem(KEY_ALL_EXERCISES, JSON.stringify(this.allExercises));
  }

  deleteExercise(id: string) {
    this.allExercises = this.allExercises.filter(
      (exercise) => exercise.id !== id
    );
    localStorage.setItem(KEY_ALL_EXERCISES, JSON.stringify(this.allExercises));
  }
}

export const exercisesStore = new ExercisesStore();
