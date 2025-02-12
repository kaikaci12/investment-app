import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, router, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import AuthProvider, { useAuth } from "@/context/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const router = useRouter();
  const { authState } = useAuth();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    RobotoMono_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    if (authState?.authenticated) {
      router.push("/(tabs)");
    } else {
      router.push("/");
    }
  }, [loaded, router, authState]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(start)" options={{ headerShown: false }} />

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          options={{
            headerTitle: "",

            headerBackTitle: "hello",

            headerLeft: () => {
              return (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackVisible: false,
            headerBackTitle: "",
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="(tabs)/crypto/cryptoItem/[id].tsx"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
