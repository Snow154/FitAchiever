import type { Exercise } from "@/types/exercise";

export type UserExercise = {
    exerciseId: Exercise["id"];
    order: number;
    addedAt: string;
}