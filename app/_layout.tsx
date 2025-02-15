import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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
  const router = useRouter();
  const { authState } = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ RobotoMono_400Regular });
  const [ready, setReady] = useState(false);

  // Handle redirection based on authentication
  useEffect(() => {
    if (loaded && authState?.authenticated !== null) {
      if (authState?.authenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
      setReady(true);
    }
  }, [loaded, authState?.authenticated]);

  useEffect(() => {
    if (loaded && ready) {
      SplashScreen.hideAsync();
    }
  }, [loaded, ready]);

  if (!loaded || !ready) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#6200ea" />
        <Text className="mt-4 text-lg font-semibold text-gray-600">
          Loading, please wait...
        </Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="crypto/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" hidden />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
