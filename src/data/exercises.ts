import type { Exercise } from "@/types/exercise";
import { exerciseNamesSk } from "@/constants/exercise-labels";
import { importedExercises } from "./imported-exercises";

const catalog = [
  {

    "id": "barbell-bench-press",
    "name": "Barbell Bench Press",
    "primaryMuscle": "chest",
    "equipment": "barbell"
  },
  {
    "id": "barbell-squat",
    "name": "Barbell Squat",
    "primaryMuscle": "quadriceps",
    "equipment": "barbell"
  },
  {
    "id": "dumbell-bench-press",
    "name": "Dumbell Bench Press",
    "primaryMuscle": "chest",
    "equipment": "dumbbell"
  },
  {
    "id": "lat-row",
    "name": "Lat Row",
    "primaryMuscle": "back",
    "equipment": "cable"
  },
  {
    "id": "high-row",
    "name": "High Row",
    "primaryMuscle": "back",
    "equipment": "cable"
  },
  {
    "id": "hammer-curls",
    "name": "Hammer Curls",
    "primaryMuscle": "biceps",
    "equipment": "dumbbell"
  },
  {
    "id": "tricep-extension",
    "name": "Tricep Extension",
    "primaryMuscle": "triceps",
    "equipment": "machine"
  },
  {
    "id": "shoulder-press",
    "name": "Shoulder Press",
    "primaryMuscle": "shoulders",
    "equipment": "dumbell"
  },
  ...importedExercises
] satisfies Exercise[];

export const exercises: Exercise[] = catalog.map((exercise) => ({
  ...exercise,
  name: exerciseNamesSk[exercise.id] ?? exercise.name,
}));
