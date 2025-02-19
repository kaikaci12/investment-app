import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MainModal from "./Modal";
import { useAuth } from "@/context/AuthProvider";

const HeaderBar = ({ user }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { authState } = useAuth();

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.container}>
      {modalVisible && authState?.authenticated && (
        <MainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user?.username}</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={24}
              color="#fff"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="menu" size={28} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.performanceContainer}>
        <View style={styles.performanceBox}>
          <Text style={styles.performanceText}>Income</Text>
          <View style={styles.performanceRow}>
            <AntDesign name="arrowup" size={24} color="green" />
            <Text style={styles.performanceValueGreen}></Text>
          </View>
        </View>
        <View style={styles.performanceBox}>
          <Text style={styles.performanceText}>Expense</Text>
          <View style={styles.performanceRow}>
            <AntDesign name="arrowdown" size={24} color="red" />
            <Text style={styles.performanceValueRed}></Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  performanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  performanceBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    width: "48%",
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  performanceText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "center",
  },
  performanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  performanceValueGreen: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  performanceValueRed: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
