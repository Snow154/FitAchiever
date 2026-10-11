import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {router} from "expo-router";
import { exercises } from "@/data/exercises";
import { ExerciseListItem } from "@/components/exercise-list-item";


export default function ExercisesScreen(){
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
                {exercises.length} cvikov v katalógu
            </Text>
            </View>
            <FlatList
                data={exercises}
                keyExtractor={(exercises) => exercises.id}
                renderItem={({item})=> (
                    <ExerciseListItem
                        name={item.name}
                        muscle={item.primaryMuscle}
                        equipment={item.equipment}
                        onPress={()=> {
                            console.log("Vybrany cvik:", item.id)
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
        backgroundColor: "#F5F7FA",
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
        color: "#17212B",
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
});
