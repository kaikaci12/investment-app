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
  const [mounted, setMounted] = useState(false);

  // Handle redirection based on authentication and ensure it happens after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && loaded && authState?.authenticated !== null) {
      if (authState?.authenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
    }
  }, [mounted, loaded, authState?.authenticated]);

  useEffect(() => {
    if (loaded && mounted) {
      SplashScreen.hideAsync();
    }
  }, [loaded, mounted]);

  if (!loaded || !mounted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={{ marginTop: 16, fontSize: 18, color: "#6b7280" }}>
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
