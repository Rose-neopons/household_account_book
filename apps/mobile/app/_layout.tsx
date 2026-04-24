import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0F172A" },
          headerTintColor: "#F8FAFC",
          contentStyle: { backgroundColor: "#F8FAFC" }
        }}
      >
        <Stack.Screen name="index" options={{ title: "AI Pocket Guard" }} />
        <Stack.Screen name="review" options={{ title: "기록 확인" }} />
      </Stack>
    </QueryClientProvider>
  );
}
