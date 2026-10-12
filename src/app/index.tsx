import { ExerciseListItem } from '@/components/exercise-list-item';
import { getEquipmentLabel, muscleLabels } from '@/constants/exercise-labels';
import { colors, radius, spacing } from '@/constants/theme';
import { exercises } from "@/data/exercises";
import { useUserExercises } from '@/providers/userExerciseProvider';
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {userExercises} = useUserExercises();

  return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>FitAchiever</Text>
          <Text style={styles.subtitle}>Tvoj tréningový hub</Text>

              <Pressable 
                  style={({ pressed }) => [
                    styles.addButton,
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                  onPress={() => router.push("/exercises")}
              >
                  <Text style={styles.addButtonText}>Pridať cvik</Text>
              </Pressable>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Moje cviky</Text>
          <Text style={styles.exerciseCount}>{userExercises.length}</Text>
        </View>
        </View>
        <FlatList

            style={styles.list}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => (
              <View style={{ height: spacing.itemGap }} />
            )}
            showsVerticalScrollIndicator={false}
            data={userExercises}
            keyExtractor={(item)=> item.exerciseId}
            renderItem={({item}) => {
              const exercise = exercises.find(
                (exercise) => exercise.id === item.exerciseId
              );

              if(!exercise){
                return null;
              }
              return (
                <ExerciseListItem
                  name={exercise.name}
                  muscle={muscleLabels[exercise.primaryMuscle]}
                  equipment={getEquipmentLabel(exercise.equipment)}
                  onPress={() => {
                    router.push({
                      pathname: "/exercise/[exerciseId]",
                      params: { exerciseId: exercise.id}
                    })
                  }}
                />
              );
            }}
          />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: spacing.screen,
    paddingTop: 24,
    paddingBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -1,
    color: colors.text,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textMuted,
  },

  addButton: {
    marginTop: 28,
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

  sectionHeader: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },

  exerciseCount: {
    fontSize: 14,
    color: colors.textMuted,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 24,
  },
});
