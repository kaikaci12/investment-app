import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";
import HeaderBar from "@/components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
