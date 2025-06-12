import { useFontLoader } from '@/src/hooks';
import { AuthProvider } from '@/src/providers';
import { theme } from '@/src/theme/theme';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import ToastManager from 'toastify-react-native/components/ToastManager';

export default function Layout() {
  const { fontsLoaded } = useFontLoader();
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <ToastManager position="bottom" duration={3000} />
      </AuthProvider>
    </PaperProvider>
  );
}