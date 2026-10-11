export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "quadriceps"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "core";

export type Exercise = {
    id: string,
    name: string,
    primaryMuscle: MuscleGroup,
    equipment: string,
}
