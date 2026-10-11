import { FlatList, Pressable, StyleSheet, Text , View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
import { exercises } from "@/data/exercises";
import { ExerciseListItem } from '@/components/exercise-list-item';
import { useUserExercises } from '@/providers/user-exercises-provider';

export default function HomeScreen() {
  const {userExercises} = useUserExercises();

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>FitAchiever</Text>
        <Text style={styles.subtitle}>Tvoj tréningový hub</Text>

        <View>
            <Pressable 
                style={styles.addButton}
                onPress={() => router.push("/exercises")}
            >
                <Text style={styles.addButtonText}>Pridať cvik</Text>
            </Pressable>
        </View>
        <View

        >
        <FlatList
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
                  muscle={exercise.primaryMuscle}
                  equipment={exercise.equipment}
                  onPress={() => {
                    console.log("Otvorený cvik:", exercise.id);
                  }}
                />
              );
            }}
          />
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#707070",
  },
  addButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "#208AEF",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
