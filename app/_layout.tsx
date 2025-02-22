import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import AuthProvider, { useAuth } from "@/context/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";

// Prevent splash screen auto-hide
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular });
  const [isAppReady, setIsAppReady] = useState(false);
  const router = useRouter();
  const { authState } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Check if fonts are loaded and authState is available
    if (fontsLoaded && authState !== undefined) {
      setIsAppReady(true);

      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authState]);

  useEffect(() => {
    // Handle navigation only after the app is fully ready
    if (isAppReady) {
      if (authState?.authenticated) {
        router.replace("/(tabs)"); // Navigate to the home screen if authenticated
      } else {
        router.replace("/Login"); // Navigate to the login screen if not authenticated
      }
    }
  }, [isAppReady, authState]);

  // Show a loading indicator until fonts and auth state are ready

  // Render the navigation stack once everything is ready
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="crypto" options={{ headerShown: false }} />
      <Stack.Screen name="stocks" options={{ headerShown: false }} />
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
