import { StyleSheet, View, Text, Pressable } from "react-native";


type ExerciseListItemProps = {
    name:string;
    muscle: string;
    equipment: string;
    onPress: () => void;
}

export function ExerciseListItem({name, muscle, equipment, onPress}: ExerciseListItemProps)
{
    return (
        <Pressable
            style = {styles.container}
            onPress = {onPress}
        >
            <Text style={styles.name}>{name}</Text>

            <View style={styles.details}>
            <Text style={styles.detailText}>{muscle}</Text>
            <Text style={styles.detailText}> · </Text>
            <Text style={styles.detailText}>{equipment}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 82,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#17212B",
  },

  details: {
    flexDirection: "row",
    marginTop: 6,
    backgroundColor: "#12148a"
  },

  detailText: {
    fontSize: 13,
    color: "#d1d5db",
    textTransform: "capitalize",
  },
});