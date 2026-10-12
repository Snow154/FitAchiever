import { colors } from "@/constants/theme";
import { UserExercisesProvider } from "@/providers/userExerciseProvider";
import { WorkoutLogsProvider } from "@/providers/workoutLogsProvider";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import * as SystemUI from "expo-system-ui";

SystemUI.setBackgroundColorAsync(colors.background).catch(console.error);

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

export default function RootLayout() {
  return (
  <ThemeProvider value={navigationTheme}>
    <UserExercisesProvider>
      <WorkoutLogsProvider>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index"/>
        <Stack.Screen name="exercises"/>
        <Stack.Screen name="exercise/[exerciseId]/index"/>

        <Stack.Screen
          name="exercise/[exerciseId]/log"
          options={{ presentation: "formSheet",
                    sheetAllowedDetents: [0.75,1],
                    sheetGrabberVisible: true,
                    contentStyle: { backgroundColor: colors.background}
           }}
        />
      </Stack>
      </WorkoutLogsProvider>
    </UserExercisesProvider>
  </ThemeProvider>
);
}