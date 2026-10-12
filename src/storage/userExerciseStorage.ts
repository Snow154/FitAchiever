import type { UserExercise } from "@/types/user-exercise";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fitachiever:user-exercises:v1";

function isUserExercise(value:unknown): value is UserExercise{
    if (typeof value !== "object" || value ===null) return false;

    return(
        "exerciseId" in value &&
        typeof value.exerciseId === "string" &&
        "order" in value &&
        typeof value.order === "number" &&
        "addedAt" in value &&
        typeof value.addedAt === "string" 
    );
}

export async function loadUserExercises(): Promise<UserExercise[]> {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);

  if (saved === null) return [];

  const parsed: unknown = JSON.parse(saved);

  if (!Array.isArray(parsed) || !parsed.every(isUserExercise)) {
    throw new Error("Uložená história má neplatný formát.");
  }

  return parsed;
}

let saveQueue: Promise<void> = Promise.resolve();

export function saveUserExercises(logs: UserExercise[]): Promise<void> {
  const json = JSON.stringify(logs);

  const save = saveQueue.then(() =>
    AsyncStorage.setItem(STORAGE_KEY, json)
  );

  saveQueue = save.catch(() => {});

  return save;
}