import { ExerciseListItem } from "@/components/exercise-list-item";
import { getEquipmentLabel, muscleLabels } from "@/constants/exercise-labels";
import { colors } from "@/constants/theme";
import { exercises } from "@/data/exercises";
import { useUserExercises } from "@/providers/userExerciseProvider";
import type { MuscleGroup } from "@/types/exercise";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const muscleFilters: MuscleGroup[] = [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "quadriceps",
  "hamstrings",
  "glutes",
  "calves",
  "core",
];

export default function ExercisesScreen(){
    const {userExercises, addUserExercise } = useUserExercises();
    const [search, setSearch] = useState("");
    const [selectedMuscle, setSelectedMuscle] =
  useState<MuscleGroup | null>(null);

    const availableExercises = exercises.filter(
        (exercise) => !userExercises.some((userExercise)=> userExercise.exerciseId === exercise.id)
    )
    
    function normalizeText(text: string){
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    const query = normalizeText(search);

    const filteredExercises = availableExercises.filter((exercise)=> {
        const matchesSearch = normalizeText(exercise.name).includes(query);

        const matchesMuscle = 
            selectedMuscle === null ||
            exercise.primaryMuscle === selectedMuscle;
        
        return matchesSearch && matchesMuscle;
    });
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <Pressable 
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <Text
                    style={styles.backButtonText}
                >
                    Späť
                </Text>
            </Pressable>

            <Text style={styles.title}>
                Vyber cvik
            </Text>
            
            <Text style={styles.subtitle}>
                {filteredExercises.length} z {availableExercises.length} dostupných cvikov
            </Text>

            <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Hľadať cvik…"
                placeholderTextColor={colors.textMuted}
                autoCorrect={false}
                autoCapitalize="none"
            />

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={styles.filterStrip}
                contentContainerStyle={styles.filterContent}
                >
                <Pressable
                    onPress={() => setSelectedMuscle(null)}
                    style={[
                    styles.filterChip,
                    selectedMuscle === null && styles.filterChipActive,
                    ]}
                >
                    <Text
                    style={[
                        styles.filterText,
                        selectedMuscle === null && styles.filterTextActive,
                    ]}
                    >
                    Všetky
                    </Text>
                </Pressable>

                {muscleFilters.map((muscle) => {
                    const isSelected = selectedMuscle === muscle;

                    return (
                    <Pressable
                        key={muscle}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                        onPress={() =>
                        setSelectedMuscle(isSelected ? null : muscle)
                        }
                        style={[
                        styles.filterChip,
                        isSelected && styles.filterChipActive,
                        ]}
                    >
                        <Text
                        style={[
                            styles.filterText,
                            isSelected && styles.filterTextActive,
                        ]}
                        >
                        {muscleLabels[muscle]}
                        </Text>
                    </Pressable>
                    );
                })}
                </ScrollView>

            </View>
            <FlatList
                data={filteredExercises}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                ListEmptyComponent={
                <Text style={styles.emptyText}>
                    {availableExercises.length === 0
                    ? "Všetky cviky už máš pridané."
                    : "Žiadny cvik nezodpovedá vyhľadávaniu."}
                </Text>
                }
                keyExtractor={(exercises) => exercises.id}
                renderItem={({item})=> (
                    <ExerciseListItem
                        name={item.name}
                        muscle={muscleLabels[item.primaryMuscle]}
                        equipment={getEquipmentLabel(item.equipment)}
                        onPress={()=> {
                            addUserExercise(item.id)
                        }}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                <View style={styles.separator} />
                )}
                showsVerticalScrollIndicator={false}
                
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },

    title: {
        marginTop: 24,
        fontSize: 28,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: "#697586",
    },

    backButton: {
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#E8EDF3",
    },

    backButtonText: {
        color: "#17212B",
        fontSize: 14,
        fontWeight: "600",
    },

    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },

    separator: {
        height: 12,
    },

    searchInput: {
        marginTop: 20,
        minHeight: 52,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        color: colors.text,
        fontSize: 16,
    },

    emptyText: {
        paddingVertical: 24,
        textAlign: "center",
        fontSize: 14,
        color: colors.textMuted,
    },

    filterStrip: {
        marginTop: 14,
        flexGrow: 0,
    },

    filterContent: {
        gap: 8,
    },

    filterChip: {
        minHeight: 44,
        justifyContent: "center",
        paddingHorizontal: 16,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },

    filterChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    filterText: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.textMuted,
    },

    filterTextActive: {
        color: colors.onPrimary,
    },
});
