import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen name="Dashboard" />
      <Stack.Screen name="Suhu" />
      <Stack.Screen name="Kelembapan" />
      <Stack.Screen name="Cahaya" />
      <Stack.Screen name="AliranAir" />
    </Stack>
  );
}
