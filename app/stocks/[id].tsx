import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import stocksData from "@/stocks.json";
import { useAuth } from "@/context/AuthProvider";
import { db } from "@/firebaseConfig";
import { getDoc, updateDoc, setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StockPage = () => {
  const { authState } = useAuth();

  const { id } = useLocalSearchParams(); // Get the `id` from the URL
  const [data, setData] = useState<any>(null); // State to hold the stock data

  useEffect(() => {
    const filteredData = stocksData.find((stock) => stock.id.toString() === id);
    setData(filteredData);
  }, [id]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  const handleBuy = async () => {
    if (!authState?.user?.uid) return;
    try {
      const userRef = doc(db, "users", authState.user.uid);
      const price = data.price;

      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      if (userData?.balance < price) {
        alert("Insufficient balance");
        return;
      }
      const newTransaction = {
        name: "Buy Stock",
        amount: price,
        date: new Date().toISOString(),
      };
      // Update AsyncStorage with the latest sender data
      const updatedData = {
        ...userData,
        balance: userData?.balance - price,
        transactions: [...userData?.transactions, newTransaction],
      };
      await updateDoc(userRef, {
        balance: userData?.balance - price,
        transactions: [...userData?.transactions, newTransaction],
      });
      AsyncStorage.setItem("currentUser", JSON.stringify(updatedData));
      alert(`You have successfully purchased ${data.name}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{data.symbol}</Text>
        <Text style={styles.name}>{data.name}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${data.price.toFixed(2)}</Text>
        <Text
          style={[
            styles.change,
            data.change.startsWith("+")
              ? styles.positiveChange
              : styles.negativeChange,
          ]}
        >
          {data.change} ({data.changePercent})
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Stock Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Symbol:</Text>
          <Text style={styles.detailValue}>{data.symbol}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{data.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>${data.price.toFixed(2)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Change:</Text>
          <Text
            style={[
              styles.detailValue,
              data.change.startsWith("+")
                ? styles.positiveChange
                : styles.negativeChange,
            ]}
          >
            {data.change} ({data.changePercent})
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>Buy Stock</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StockPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  symbol: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 18,
    color: "#666",
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  price: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  change: {
    fontSize: 20,
    fontWeight: "bold",
  },
  positiveChange: {
    color: "#4CAF50", // Green for positive change
  },
  negativeChange: {
    color: "#F44336", // Red for negative change
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
