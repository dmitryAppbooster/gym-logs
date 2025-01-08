import { makeAutoObservable } from "mobx";
import { ALL_EXERCISES } from "../const/exercises";
import type { NewExercise } from "../types/type";

const KEY_ALL_EXERCISES = "ALL_EXERCISES";

class ExercisesStore {
  allExercises: NewExercise[] = [];

  constructor() {
    makeAutoObservable(this);
    const allExercisesFromStorage = localStorage.getItem(KEY_ALL_EXERCISES);
    if (allExercisesFromStorage) {
      this.allExercises = JSON.parse(allExercisesFromStorage);
    } else {
      this.allExercises = ALL_EXERCISES || [];
    }
  }

  addExercise(newExercise: NewExercise) {
    this.allExercises.push(newExercise);
    localStorage.setItem(KEY_ALL_EXERCISES, JSON.stringify(this.allExercises));
  }

  updateExercise({
    name,
    updatedExercise,
  }: {
    name: string;
    updatedExercise: Partial<NewExercise>;
  }) {
    this.allExercises = this.allExercises.map((exercise) => {
      if (exercise.name === name) {
        exercise = { ...exercise, ...updatedExercise };
      }
      return exercise;
    });
    localStorage.setItem(KEY_ALL_EXERCISES, JSON.stringify(this.allExercises));
  }

  deleteExercise(name: string) {
    this.allExercises = this.allExercises.filter(
      (exercise) => exercise.name !== name
    );
    localStorage.setItem(KEY_ALL_EXERCISES, JSON.stringify(this.allExercises));
  }
}

export const exercisesStore = new ExercisesStore();
