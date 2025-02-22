import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";

import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import AuthProvider, { useAuth } from "@/context/AuthProvider";

import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular });
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    // Check if fonts are loaded and authState is available
    if (fontsLoaded && authState !== undefined) {
      setIsAppReady(true);

      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authState]);

  useEffect(() => {
    if (isAppReady) {
      if (authState?.authenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
    }
  }, [isAppReady, authState, router]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="crypto/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="stocks/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="Profile" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <StatusBar style="dark" hidden />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
