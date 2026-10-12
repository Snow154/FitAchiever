import type { ExerciseLog, WorkoutSet } from "@/types/workout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fitachiever:workout-logs:v1";

function isWorkoutSet(value:unknown): value is WorkoutSet{
    if (typeof value !== "object" || value ===null) return false;

    return(
        "id" in value &&
        typeof value.id === "string" &&
        "weightKg" in value && 
        typeof value.weightKg === "number" &&
        Number.isFinite(value.weightKg) &&
        value.weightKg >= 0 &&
        "reps" in value && 
        typeof value.reps === "number" &&
        Number.isInteger(value.reps) &&
        value.reps >0
    );
}

function isExerciseLog(value:unknown): value is ExerciseLog {
    if(typeof value !== "object" || value === null) return false;

    return (
        "id" in value &&
        typeof value.id === "string" &&
        "exerciseId" in value &&
        typeof value.exerciseId === "string" &&
        "performedAt" in value &&
        typeof value.performedAt === "string" &&
        Number.isFinite(Date.parse(value.performedAt)) &&
        "sets" in value &&
        Array.isArray(value.sets) &&
        value.sets.length > 0 &&
        value.sets.every(isWorkoutSet) &&
        (!("comment" in value) ||
        value.comment === undefined ||
        typeof value.comment === "string")
    );
}

export async function loadWorkoutLogs(): Promise<ExerciseLog[]> {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);

  if (saved === null) return [];

  const parsed: unknown = JSON.parse(saved);

  if (!Array.isArray(parsed) || !parsed.every(isExerciseLog)) {
    throw new Error("Uložená história má neplatný formát.");
  }

  return parsed;
}

let saveQueue: Promise<void> = Promise.resolve();

export function saveWorkoutLogs(logs: ExerciseLog[]): Promise<void> {
  const json = JSON.stringify(logs);

  const save = saveQueue.then(() =>
    AsyncStorage.setItem(STORAGE_KEY, json)
  );

  saveQueue = save.catch(() => {});

  return save;
}