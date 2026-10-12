import { Exercise } from "./exercise";

export type WorkoutSet = {
    id: string;
    weightKg: number;
    reps: number;
};

export type ExerciseLog = {
    id: string;
    exerciseId: Exercise["id"];
    performedAt: string;
    sets: WorkoutSet[];
    comment?: string;
}