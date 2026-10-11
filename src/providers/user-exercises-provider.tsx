import { createContext, useContext, useState, type ReactNode, } from "react";

import { userExercises as initialUserExercises } from "@/data/user-exercises";
import type { UserExercise } from "@/types/user-exercise";


type UserExercisesContextValue = {
  userExercises: UserExercise[];
};

const UserExercisesContext = 
    createContext<UserExercisesContextValue | undefined>(undefined);

type UserExercisesProviderProps = {
  children: ReactNode;
};

export function UserExercisesProvider({
  children,
}: UserExercisesProviderProps) {
  const [userExercises] = useState<UserExercise[]>(
    initialUserExercises
  );

  return (
    <UserExercisesContext.Provider
      value={{ userExercises }}
    >
      {children}
    </UserExercisesContext.Provider>
  );
}

export function useUserExercises() {
  const context = useContext(UserExercisesContext);

  if (context === undefined) {
    throw new Error(
      "useUserExercises must be used inside UserExercisesProvider"
    );
  }

  return context;
}