import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={"#2F4F7F"} />
          ),
        }}
      />
      <Tabs.Screen
        name="stocks"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="trending-up" size={24} color="#2F4F7F" />
          ),
        }}
      />
      <Tabs.Screen
        name="exchange"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="exchange-alt" size={24} color="#2F4F7F" />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="logo-bitcoin" size={24} color="#2F4F7F" />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color="#2F4F7F" />
          ),
        }}
      />
    </Tabs>
  );
}
