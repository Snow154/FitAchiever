import { Stack } from "expo-router";
import { UserExercisesProvider } from "@/providers/user-exercises-provider";

export default function RootLayout() {
  return (
    <UserExercisesProvider>
      <Stack 
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserExercisesProvider>
  )
}