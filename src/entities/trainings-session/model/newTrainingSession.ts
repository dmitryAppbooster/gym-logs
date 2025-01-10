import { ExerciseWithSets, WorkingSet } from "@/entities/trainings-session";
import { getCurrentDate } from "@/shared/libs";
import { autorun, makeAutoObservable, runInAction } from "mobx";

const KEY_NEW_TRAINING_SESSION_DATA = "NEW_TRAINING_SESSION_DATA";

type TrainingStatus = "inProgress" | "paused" | "notStarted";

class NewTrainingSessionStore {
  exercisesWithSets: ExerciseWithSets[] = [];
  startedAt: string = "";
  status: TrainingStatus = "notStarted";
  pauseTime: number = 0;
  intervalId: number | undefined | NodeJS.Timeout = undefined;
  duration: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get data() {
    return {
      exercisesWithSets: this.exercisesWithSets,
      startedAt: this.startedAt,
    };
  }

  changeStatus({ status }: { status: TrainingStatus }) {
    this.status = status;
    if (status !== "notStarted" && !this.startedAt) {
      this.startedAt = getCurrentDate();
    }
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

  startTraining() {
    if (this.status === "notStarted") {
      this.status = "inProgress";
      this.startTimer();
      this.startedAt = new Date().toISOString();

      if (!this.intervalId) {
        this.startTimer();
      }
    }
  }

  pauseTraining() {
    if (this.status === "inProgress") {
      this.status = "paused";
      this.pauseTime = new Date().getTime();

      if (this.intervalId) {
        this.stopTimer();
      }
    }
  }

  resumeTraining() {
    if (this.status === "paused") {
      this.status = "inProgress";
      this.pauseTime = new Date().getTime();

      if (!this.intervalId) {
        this.startTimer();
      }
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      KEY_NEW_TRAINING_SESSION_DATA,
      JSON.stringify(this.data)
    );
  }

  // Запуск таймера
  private startTimer() {
    this.intervalId = setInterval(() => {
      this.duration = new Date().getTime() - new Date(this.startedAt).getTime();
    }, 1000);
  }

  // Остановка таймера
  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}

export const newTrainingSessionStore = new NewTrainingSessionStore();
