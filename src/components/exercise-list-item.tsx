import { colors, radius } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";


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
            style={({ pressed }) => [
              styles.container,
              { opacity: pressed ? 0.75 : 1 },
            ]}
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
    minHeight: 88,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },

  detailText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
