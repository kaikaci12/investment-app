import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LogoutModal from "./Logout"; // Ensure correct path
import { useAuth } from "@/context/AuthProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
const HeaderBar = ({ user }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { authState } = useAuth();

  return (
    <View style={styles.container}>
      {modalVisible && authState?.authenticated && (
        <LogoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      <View style={styles.header}>
        <View>
          <Image
            source={require("@/assets/images/avatar.png")} // Adjusted to require() for static images
            style={styles.avatar}
          />
          <Text style={styles.performanceText}>{user?.username}</Text>
        </View>

        <View style={styles.icons}>
          <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
          <Ionicons
            name="menu"
            onPress={() => setModalVisible(true)}
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.performanceContainer}>
        <View style={styles.performance}>
          <Text style={styles.performanceText}>All time performance</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="arrowup" size={24} color="green" />
            <Text
              style={{
                color: "green",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              +0.11%
            </Text>
          </View>
        </View>
        <View style={styles.performance}>
          <Text style={styles.performanceText}>All time performance</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="arrowdown" size={24} color="red" />
            <Text
              style={{
                color: "red",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              +0.11%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Main background remains white
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2B4EFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35, // Adjusted for perfect circular avatar
  },
  headerContent: {
    alignItems: "center",
    flex: 1,
  },
  playLearn: {
    color: "#fff",
    fontSize: 14,
  },
  amount: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },

  // Blue background for navLinks and performance
  contentWrapper: {
    backgroundColor: "#2B4EFF",
    paddingBottom: 20,
  },
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navLink: {
    color: "#fff",
    fontSize: 16,
  },

  // Performance section styling
  performanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  performance: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight transparency for contrast
    borderRadius: 10,
    width: 154,
    height: 101,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  performanceText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 5,
  },
  performanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  performanceValue: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
