import { userExercises as initialUserExercises } from "@/data/user-exercises";
import { loadUserExercises, saveUserExercises } from "@/storage/userExerciseStorage";
import type { UserExercise } from "@/types/user-exercise";
import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import { Alert } from "react-native";


type UserExercisesContextValue = {
  userExercises: UserExercise[];
  addUserExercise: (exerciseId: UserExercise["exerciseId"]) => void;
};

const UserExercisesContext = 
    createContext<UserExercisesContextValue | undefined>(undefined);

type UserExercisesProviderProps = {
  children: ReactNode;
};

export function UserExercisesProvider({
  children,
}: UserExercisesProviderProps) {
  const [userExercises, setUserExercises] = useState<UserExercise[]>(initialUserExercises);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
          let cancelled = false;
  
          async function load() {
          try {
              const savedUserExercises = await loadUserExercises();
  
              if (!cancelled) {
              setUserExercises(savedUserExercises);
              }
          } catch {
              if (!cancelled) {
              setLoadError("Históriu sa nepodarilo načítať.");
              }
          } finally {
              if (!cancelled) {
              setIsLoading(false);
              }
          }
          }
  
          void load();
  
          return () => {
          cancelled = true;
          };
      }, []);

  useEffect(() => {
          if (isLoading || loadError !== null) {
              return;
          }
  
          saveUserExercises(userExercises).catch((error: unknown) => {
              console.error("Uloženie histórie zlyhalo:", error);
  
              Alert.alert(
              "História sa neuložila",
              "Záznamy sú zatiaľ iba v pamäti. Nezatváraj aplikáciu.",
              [
                  { text: "Zavrieť", style: "cancel" },
                  {
                  text: "Skúsiť znova",
                  onPress: () => {
                      // Vyvolá nový pokus cez tento efekt.
                      setUserExercises((previous) => [...previous]);
                  },
                  },
              ]
              );
          });
          }, [userExercises, isLoading, loadError]);
  
  function addUserExercise(exerciseId: UserExercise["exerciseId"]){
      setUserExercises((previous) => {
        const alreadyAdded = previous.some(
          (item) => item.exerciseId === exerciseId
        );

        if (alreadyAdded) return previous;

        const newUserExercise : UserExercise = {
          exerciseId,
          order: previous.length,
          addedAt: new Date().toISOString(),
        };

        return [...previous, newUserExercise];
      });
  }

  return (
    <UserExercisesContext.Provider
      value={{ userExercises, addUserExercise }}
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