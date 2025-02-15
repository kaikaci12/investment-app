import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
import { Card, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/firebaseConfig";
export default function HomeScreen() {
  const [userProfile, setUserProfile] = useState<any>();
  const { authState } = useAuth();
  useEffect(() => {
    const fetchUser = () => {
      if (authState?.authenticated) {
        setUserProfile(authState.user);
      } else {
        router.push("/");
      }
    };

    fetchUser();
  }, [authState]);

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    { date: "6.3.2024, 13:36:43", amount: "87€", type: "Add money" },
    { date: "6.3.2024, 13:36:43", amount: "416€", type: "Add money" },
    { date: "6.3.2024, 13:36:43", amount: "682€", type: "Add money" },
  ];

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.amount.includes(searchQuery) ||
      transaction.type.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <HeaderBar user={userProfile} />
      <View style={{ padding: 20 }}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Cash Balance</Text>
            <Text style={styles.amount}>{userProfile?.balance}</Text>
          </Card.Content>
        </Card>

        <View style={styles.searchContainer}>
          <Text style={styles.transactionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {filteredTransactions.map((transaction, index) => (
            <Card key={index} style={styles.transactionCard}>
              <Card.Content>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionAmount}>
                  {transaction.amount}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={searchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search transactions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSearchModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  amount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  transactionCard: {
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionAmount: {
    fontSize: 18,
    color: "#000",
    marginTop: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
