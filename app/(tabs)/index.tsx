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
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<any>([]);
  const { authState } = useAuth();
  useEffect(() => {
    if (authState?.authenticated && authState.user) {
      setUserProfile({ ...authState.user });
      setTransactions(authState.user?.transactions || []);
    } else {
      router.push("/");
    }
  }, [authState]);

  const filteredTransactions =
    transactions?.filter(
      (transaction: any) =>
        String(transaction.amount).includes(searchQuery) ||
        transaction.name.includes(searchQuery)
    ) || [];

  return (
    <View style={styles.container}>
      <HeaderBar user={userProfile} />

      <View style={styles.cardContainer}>
        <Card style={styles.card} key={userProfile?.uid}>
          <Card.Content key={userProfile?.uid}>
            <Text style={styles.cardLabel}>Cash Balance</Text>
            <Text style={styles.cardAmount}>{userProfile?.balance}</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
            <Ionicons name="search" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {filteredTransactions?.map((transaction: any) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <Card.Content key={transaction.id}>
                <View style={styles.transactionRow}>
                  <Text style={styles.transactionType}>{transaction.name}</Text>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.name.includes("Recieve money")
                        ? styles.positiveAmount
                        : styles.negativeAmount,
                    ]}
                  >
                    {transaction.name.includes("Recieve money") ? "+" : "-"}$
                    {Math.abs(transaction.amount)}
                  </Text>
                </View>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toDateString()}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Search Modal */}
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
              placeholderTextColor="#999"
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
    backgroundColor: "#F8F9FA",
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#6C63FF",
    borderRadius: 16,
    elevation: 4,
  },
  cardLabel: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.8,
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 8,
  },
  transactionsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  transactionCard: {
    marginBottom: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 2,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  positiveAmount: {
    color: "#27AE60",
  },
  negativeAmount: {
    color: "#E74C3C",
  },
  transactionDate: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#2C3E50",
  },
  closeButton: {
    backgroundColor: "#6C63FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
