import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [fontsLoaded] = useFonts({
    MemomentKkukkukk: require('../assets/fonts/MemomentKkukkukk.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFF8FC' },
          headerTintColor: '#5B4B8A',
          headerTitleStyle: {
            color: '#403561',
            fontFamily: 'MemomentKkukkukk',
            fontSize: 24,
          },
          contentStyle: { backgroundColor: '#FFF8FC' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: '' }}
        />
        <Stack.Screen
          name="review"
          options={{ title: '확인 카드', presentation: 'card' }}
        />
        <Stack.Screen
          name="future-simulator"
          options={{ title: '미래 시뮬레이터', presentation: 'card' }}
        />
        <Stack.Screen
          name="guardian"
          options={{ title: '지름신 방어', presentation: 'card' }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
