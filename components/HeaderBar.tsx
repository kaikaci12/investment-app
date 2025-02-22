import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MainModal from "./Modal";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";

const HeaderBar = ({ user }: any) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { authState } = useAuth();
  useEffect(() => {
    const calculate = () => {
      if (authState?.user?.transactions) {
        const { transactions } = authState.user;

        const { expense, income } = transactions.reduce(
          (acc: any, transaction: any) => {
            if (transaction.name.includes("Recieve money")) {
              acc.income += transaction.amount;
            } else {
              acc.expense += transaction.amount;
            }
            return acc;
          },
          { expense: 0, income: 0 } //
        );

        setExpense(expense);
        setIncome(income);
      }
    };

    calculate();
  }, [authState?.user?.transactions]);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.container}>
      {modalVisible && authState?.authenticated && (
        <MainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/Profile")}
          style={styles.userInfo}
        >
          <Image
            source={
              user?.avatarUrl
                ? { uri: user.avatarUrl }
                : require("@/assets/images/avatar.png")
            }
            style={styles.avatar}
          />
          <Text style={styles.username}>{user?.username}</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
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
            <Text style={styles.performanceValueGreen}>{income}$</Text>
          </View>
        </View>
        <View style={styles.performanceBox}>
          <Text style={styles.performanceText}>Expense</Text>
          <View style={styles.performanceRow}>
            <AntDesign name="arrowdown" size={24} color="red" />
            <Text style={styles.performanceValueRed}>{expense}$</Text>
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
    marginBottom: 40,
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
    color: "rgb(0, 128, 15)",
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
