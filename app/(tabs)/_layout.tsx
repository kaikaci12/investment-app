import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,

        tabBarStyle: Platform.select({
          ios: {
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
            <Entypo name="home" size={24} color="#2F4F7F" />
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
        name="transactions"
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
