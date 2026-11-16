import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/constants/theme";
import { loadWorkoutLogs, saveWorkoutLogs } from "@/storage/workoutLogStorage";
import type { ExerciseLog } from "@/types/workout";

type WorkoutLogsContextValue = {
  logs: ExerciseLog[];
  addLog: (log: ExerciseLog) => void;
  removeLog: (log: ExerciseLog["id"]) => void;
};

type WorkoutLogsProviderProps = {
  children: ReactNode;
};

const WorkoutLogsContext = 
    createContext<WorkoutLogsContextValue | undefined>(undefined);


export function WorkoutLogsProvider({children,}: WorkoutLogsProviderProps) {
    const [logs, setWorkoutLogs] = useState<ExerciseLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
        try {
            const savedLogs = await loadWorkoutLogs();

            if (!cancelled) {
            setWorkoutLogs(savedLogs);
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

        saveWorkoutLogs(logs).catch((error: unknown) => {
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
                    setWorkoutLogs((previous) => [...previous]);
                },
                },
            ]
            );
        });
        }, [logs, isLoading, loadError]);

    function addLog(log: ExerciseLog){
        setWorkoutLogs((previous)=> [...previous, log]);
    }

    function removeLog(log: ExerciseLog["id"]){
        setWorkoutLogs((previous) => {
            return previous.filter((ExerciseLog) => ExerciseLog.id !== log )
            }
        )
    }

    if (isLoading || loadError) {
        return (
        <View style={styles.loadingContainer}>
            <Text style={styles.message}>
            {loadError ?? "Načítavam históriu…"}
            </Text>
        </View>
        );
    }

    return (
        <WorkoutLogsContext.Provider value={{ logs, addLog, removeLog }}>
        {children}
        </WorkoutLogsContext.Provider>
    );
}

export function useWorkoutLogs() {
  const context = useContext(WorkoutLogsContext);

  if (context === undefined) {
    throw new Error(
      "useWorkoutLogs must be used inside WorkoutLogsProvider"
    );
  }

  return context;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.screen,
    backgroundColor: colors.background,
  },

  message: {
    color: colors.text,
    textAlign: "center",
  },
});