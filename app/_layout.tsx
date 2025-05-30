import { useFontLoader } from '@/src/hooks';
import { AuthProvider } from '@/src/providers';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect } from 'react';
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
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <ToastManager position="bottom" duration={3000} />
    </AuthProvider>
  );
}
