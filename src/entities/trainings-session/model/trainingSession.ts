import { makeAutoObservable } from "mobx";
import { TrainingSession } from "../types";

const KEY_TRAINING_SESSIONS = "TRAINING_SESSIONS";

class TrainingSessionStore {
  trainingSessions: TrainingSession[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    const allExercisesFromStorage = localStorage.getItem(KEY_TRAINING_SESSIONS);
    if (allExercisesFromStorage) {
      this.trainingSessions = JSON.parse(allExercisesFromStorage) || [];
    }
  }

  addTriningSession({
    newTrainingSession,
  }: {
    newTrainingSession: TrainingSession;
  }) {
    this.trainingSessions.push(newTrainingSession);
    localStorage.setItem(
      KEY_TRAINING_SESSIONS,
      JSON.stringify(this.trainingSessions)
    );
  }

  updateTriningSession({
    id,
    updatedTrainingSession,
  }: {
    id: string;
    updatedTrainingSession: Partial<TrainingSession>;
  }) {
    this.trainingSessions = this.trainingSessions.map((trainingSession) => {
      if (trainingSession.id === id) {
        trainingSession = { ...trainingSession, ...updatedTrainingSession };
      }
      return trainingSession;
    });
    localStorage.setItem(
      KEY_TRAINING_SESSIONS,
      JSON.stringify(this.trainingSessions)
    );
  }

  deleteTriningSession({ id }: { id: string }) {
    this.trainingSessions = this.trainingSessions.filter(
      (trainingSession) => trainingSession.id !== id
    );
    localStorage.setItem(
      KEY_TRAINING_SESSIONS,
      JSON.stringify(this.trainingSessions)
    );
  }
}

export const trainingSessionStore = new TrainingSessionStore();
