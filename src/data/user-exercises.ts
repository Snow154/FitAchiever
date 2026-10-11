import type { UserExercise } from "@/types/user-exercise";

export const userExercises = [
  {
    exerciseId: "barbell-bench-press",
    order: 0,
    addedAt: "2026-10-05T10:00:00.000Z",
  },
  {
    exerciseId: "barbell-squat",
    order: 1,
    addedAt: "2026-10-05T10:05:00.000Z",
  },
] satisfies UserExercise[];