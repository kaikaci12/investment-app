import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "/assets/images/avatar.png" }}
          style={styles.avatar}
        />
        <View style={styles.headerContent}>
          <Text style={styles.playLearn}>Play & Learn ▼</Text>
          <Text style={styles.amount}>€999, 139</Text>
        </View>
        <View style={styles.icons}>
          <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
          <Ionicons name="menu" size={24} color="#fff" style={styles.icon} />
        </View>
      </View>

      <View style={styles.navLinks}>
        <Text style={styles.navLink}>Stats</Text>
        <Text style={styles.navLink}>Portfolio</Text>
        <Text style={styles.navLink}>Risk</Text>
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius: 25,
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
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2B4EFF",
    paddingVertical: 10,
  },
  navLink: {
    color: "#fff",
    fontSize: 16,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#2B4EFF",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#555",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
