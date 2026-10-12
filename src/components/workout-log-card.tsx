import { StyleSheet, Text, View } from "react-native";

import { colors, radius } from "@/constants/theme";
import type { WorkoutSet } from "@/types/workout";

type WorkoutLogCardProps = {
  performedAt: string;
  sets: WorkoutSet[];
};

export function WorkoutLogCard({
  performedAt,
  sets,
}: WorkoutLogCardProps) {
  const date = new Date(performedAt);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dateGroup}>
          <Text style={styles.date}>
            {date.toLocaleDateString("sk-SK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>

          <Text style={styles.time}>
            {date.toLocaleTimeString("sk-SK", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <Text style={styles.count}>{sets.length}× séria</Text>
      </View>

      <View style={styles.sets}>
        {sets.map((set, index) => (
          <View key={set.id} style={styles.setRow}>
            <Text style={styles.setLabel}>
              {index + 1}. séria
            </Text>

            <Text style={styles.performance}>
              {set.weightKg.toLocaleString("sk-SK")} kg
              {" × "}
              {set.reps}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  dateGroup: {
    flex: 1,
  },

  date: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  time: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
  },

  count: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.background,
    fontSize: 12,
    color: colors.textMuted,
  },

  sets: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 8,
  },

  setLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },

  performance: {
    fontSize: 16,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
});