import { WorkoutLogCard } from "@/components/workout-log-card";
import { getEquipmentLabel, muscleLabels } from "@/constants/exercise-labels";
import { colors, radius, spacing } from "@/constants/theme";
import { exercises } from "@/data/exercises";
import { useWorkoutLogs } from "@/providers/workoutLogsProvider";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExerciseDetailScreen(){
    const {exerciseId} = useLocalSearchParams<{exerciseId?: string| string[];}>()
    const {logs } = useWorkoutLogs();
    const id = Array.isArray(exerciseId) ? exerciseId[0] : exerciseId;
    const exercise = exercises.find((item) => item.id === id)
    
    
    const exerciseLogs = logs.filter((log)=> log.exerciseId === id).sort((a,b)=> b.performedAt.localeCompare(a.performedAt));
    
    if(!exercise){
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Cvik sa nenašiel</Text>
            </SafeAreaView>
        );
    }

     return (
        <SafeAreaView style={styles.container}>

          <Pressable 
              onPress={() => router.back()}
              style={styles.backButton}
                      >
              <Text 
                style={styles.backButtonText}>
              Späť
              </Text>
            </Pressable>
        <Text style={styles.title}>{exercise.name}</Text>

        <Text style={styles.subtitle}>
            {muscleLabels[exercise.primaryMuscle]} · {getEquipmentLabel(exercise.equipment)}
        </Text>

        <Pressable
            style={({pressed}) => [
              styles.logButton,
              {opacity: pressed ? 0.8 : 1},
            ]}
            onPress={
              ()=> router.push({
                pathname: "/exercise/[exerciseId]/log",
                params: {exerciseId: exercise.id}
              })
            }

        >
          <Text style={styles.logButtonText}>+ Zapísať tréning </Text>
        </Pressable>

        <View style={styles.history}>
            <Text style={styles.sectionTitle}>História tréningov</Text>
            
            {exerciseLogs.length === 0 ? (
              <Text style={styles.subtitle}>Zatiaľ nemáš žiadne záznamy.</Text>
            ) : (
              <View style={styles.historyList}>
                  {exerciseLogs.map((log) => (
                    <WorkoutLogCard
                      key={log.id}
                      performedAt={log.performedAt}
                      sets={log.sets}
                    />
                  ))}
                </View>
            )}

        </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screen,
    paddingTop: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textMuted,
  },
  history: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
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

    logButton: {
      marginTop: 24,
      minHeight: 54,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.button,
      backgroundColor: colors.primary,
    },

    logButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.onPrimary,
    },

    historyList: {
      marginTop: 16,
      gap: spacing.itemGap,
    },
});
