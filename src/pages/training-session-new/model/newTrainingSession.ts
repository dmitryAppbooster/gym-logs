import { ExerciseWithSets, WorkingSet } from "@/entities/trainings-session";
import { getCurrentDate } from "@/shared/libs";
import { makeAutoObservable } from "mobx";

const KEY_NEW_TRAINING_SESSION_DATA = "NEW_TRAINING_SESSION_DATA";

export class NewTrainingSessionStore {
  exercisesWithSets: ExerciseWithSets[] = [];
  startedAt: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.startedAt = getCurrentDate();
  }

  get data() {
    return {
      exercisesWithSets: this.exercisesWithSets,
      startedAt: this.startedAt,
    };
  }

  addExercise({
    newExerciseWithSets,
  }: {
    newExerciseWithSets: ExerciseWithSets;
  }) {
    this.exercisesWithSets.push(newExerciseWithSets);
    this.saveToLocalStorage();
  }

  addSetToExercise({
    exerciseId,
    newSet,
  }: {
    exerciseId: string;
    newSet: WorkingSet;
  }) {
    const exercise = this.exercisesWithSets.find(
      (e) => e.exerciseId === exerciseId
    );
    if (exercise) {
      exercise.sets.push(newSet);
      this.saveToLocalStorage();
    }
  }

  updateExercise({
    exerciseId,
    updatedExerciseId,
  }: {
    exerciseId: string;
    updatedExerciseId: string;
  }) {
    const exercise = this.exercisesWithSets.find(
      (e) => e.exerciseId === exerciseId
    );
    if (exercise) {
      exercise.exerciseId = updatedExerciseId;
      this.saveToLocalStorage();
    }
  }

  // Обновление данных сета
  updateSet({
    exerciseId,
    setId,
    updatedSetData,
  }: {
    exerciseId: string;
    setId: string;
    updatedSetData: Partial<Pick<WorkingSet, "weight" | "repetitions">>;
  }) {
    const exerciseWithSets = this.exercisesWithSets.find(
      (e) => e.exerciseId === exerciseId
    );
    if (exerciseWithSets) {
      const set = exerciseWithSets.sets.find((s) => s.id === setId);
      if (set) {
        Object.assign(set, updatedSetData);
        this.saveToLocalStorage();
      }
    }
  }

  deleteExercise({ exerciseId }: { exerciseId: string }) {
    const index = this.exercisesWithSets.findIndex(
      (e) => e.exerciseId === exerciseId
    );
    if (index !== -1) {
      this.exercisesWithSets.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  removeSet({ exerciseId, setId }: { exerciseId: string; setId: string }) {
    const exercise = this.exercisesWithSets.find(
      (e) => e.exerciseId === exerciseId
    );
    if (exercise) {
      const setIndex = exercise.sets.findIndex((s) => s.id === setId);
      if (setIndex !== -1) {
        exercise.sets.splice(setIndex, 1);
        this.saveToLocalStorage();
      }
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      KEY_NEW_TRAINING_SESSION_DATA,
      JSON.stringify(this.data)
    );
  }
}
