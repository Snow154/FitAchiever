import { colors, radius, spacing } from "@/constants/theme";
import { exercises } from "@/data/exercises";
import { useWorkoutLogs } from "@/providers/workoutLogsProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SetDraft = {
    id: string;
    weight: string;
    reps: string;
}



export default function LogScreen(){

const { exerciseId } = useLocalSearchParams<{exerciseId?: string | string[]}>();
const id = Array.isArray(exerciseId) ? exerciseId[0] : exerciseId;
const exercise = exercises.find((item) => item.id === id);
const {addLog} = useWorkoutLogs();
const [error, setError] = useState("");

const [sets, setSets] = useState<SetDraft[]>([
    { id: "1", weight: "", reps: "" },
]);

const [weight, setWeight] = useState("");
const [reps, setReps] = useState("");

function addSet() {
  setSets((previous) => [
    ...previous,
    {
      id: String(Date.now()),
      weight: "",
      reps: "",
    },
  ]);
}

function saveLog(){
    if(!exercise){
        setError("Cvik sa nenašiel.");
        return;
    }

    const hasInvalidSet = 
        sets.length === 0 || sets.some((set) => {
            const weight = Number(set.weight.trim().replace(",","."));
            const reps = Number(set.reps.trim());

            return (
                set.weight.trim() === "" ||
                set.reps.trim() === "" ||
                !Number.isFinite(weight) ||
                weight < 0 || 
                !Number.isInteger(reps) ||
                reps <= 0
            );
        })

    if(hasInvalidSet){
        setError("Vyplň každú sériu: váha musí byť 0 alebo viac a opakovania kladné celé číslo.");
        return;
    }

    addLog({
        id: String(Date.now()),
        exerciseId: exercise.id,
        performedAt: new Date().toISOString(),
        sets: sets.map((set)=> ({
            id: set.id,
            weightKg : Number(set.weight.trim().replace(",",".")),
            reps: Number(set.reps.trim()),
        })),
    });

    router.back();
}

function removeSet(setId: string) {
    setSets((previous) => {
        if( previous.length <= 1){
            return previous;
        }

        return previous.filter((set) => set.id !== setId);
    })
}

return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View style={styles.header}>
        <Text style={styles.title}>Zapísať tréning</Text>

        <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
            styles.cancelButton,
            { opacity: pressed ? 0.6 : 1 },
            ]}
        >
            <Text style={styles.cancelButtonText}>Zrušiť</Text>
        </Pressable>
        </View>

        <Text style={styles.subtitle}>{exercise?.name}</Text>
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.formContent}
            keyboardShouldPersistTaps="handled"
        >  
        {sets.map((set,index) => (
            <View key={set.id} style={styles.setCard}>
            <View style={styles.setHeader}>
            <Text style={styles.setTitle}>Séria {index + 1}</Text>

            {sets.length > 1 && (
                <Pressable
                onPress={() => removeSet(set.id)}
                style={styles.removeButton}
                >
                <Text style={styles.removeButtonText}>Odstrániť</Text>
                </Pressable>
            )}
            </View>

            <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                <Text style={styles.label}>Váha (kg)</Text>
                <TextInput
                    style={styles.input}
                    value={set.weight}
                    onChangeText={(text) => 
                        setSets((previous) =>
                            previous.map((item) =>
                                item.id === set.id ? {...item, weight: text } : item
                            )
                        )
                    }
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={colors.textMuted}
                />
            </View>

            <View style={styles.inputGroup}>
            <Text style={styles.label}>Opakovania</Text>
            <TextInput
                style={styles.input}
                value={set.reps}
                onChangeText={(text) => 
                        setSets((previous) =>
                            previous.map((item) =>
                                item.id === set.id ? {...item, reps: text } : item
                            )
                        )
                    }
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                />
                </View>
            </View>
        </View>
        ))}

        
        <Pressable
            onPress={() => addSet()}
            style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed ? 0.8 : 1 },
            ]}
            >
            <Text style={styles.addButtonText}>+ Pridať sériu</Text>
        </Pressable>
        
        {error !== "" && (
        <Text style={{ color: "#FFB4AB", marginTop: 12 }}>
            {error}
        </Text>
        )}

        <Pressable style={styles.addButton} onPress={saveLog}>
        <Text style={styles.addButtonText}>Uložiť tréning</Text>
        </Pressable>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    backgroundColor: colors.background,
  },

  header: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },

  cancelButton: {
    minHeight: 44,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.surface,
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },

  setCard: {
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    backgroundColor: colors.surface,
    },

    setTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    },

    inputRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    },

    inputGroup: {
    flex: 1,
    },

    label: {
    marginBottom: 8,
    fontSize: 13,
    color: colors.textMuted,
    },

    input: {
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 18,
    },

    addButton: {
        marginTop: 24,
        minHeight: 54,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.button,
        backgroundColor: colors.primary,
    },
    
    addButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },

    formContent: {
        paddingBottom: 32,
    },

    setHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },

    removeButton: {
        minHeight: 44,
        justifyContent: "center",
        paddingHorizontal: 8,
    },

    removeButtonText: {
        fontSize: 13,
        color: "#FFB4AB",
    },
});