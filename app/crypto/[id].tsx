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
import cryptoData from "@/crypto.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
const CoinData = () => {
  const [data, setData] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const { authState } = useAuth();
  useEffect(() => {
    const filterData = () => {
      const filteredData = cryptoData.find(
        (crypto) => crypto.id.toString() === id
      );
      setData(filteredData);
    };
    filterData();
  }, [id]);

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
        name: `Buy ${data.name}`,
        amount: price,
        date: new Date().toISOString(),
      };

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
      alert(`You have successfully purchased ${data.symbol} stock`);
    } catch (error) {
      alert(error);
    }
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={{ uri: data.logo }} style={styles.logo} />
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.symbol}>({data.symbol})</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.description}>{data.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>${data.price.toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Market Cap:</Text>
            <Text style={styles.value}>
              ${data.market_cap.toLocaleString()}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>24h Volume:</Text>
            <Text style={styles.value}>
              ${data.volume_24h.toLocaleString()}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Circulating Supply:</Text>
            <Text style={styles.value}>
              {data.circulating_supply.toLocaleString()} {data.symbol}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Total Supply:</Text>
            <Text style={styles.value}>
              {data.total_supply.toLocaleString()} {data.symbol}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Max Supply:</Text>
            <Text style={styles.value}>
              {data.max_supply ? data.max_supply.toLocaleString() : "N/A"}{" "}
              {data.symbol}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>24h Price Change:</Text>
            <Text
              style={[
                styles.value,
                data.price_change_24h > 0 ? styles.positive : styles.negative,
              ]}
            >
              {data.price_change_24h > 0 ? "+" : ""}
              {data.price_change_24h.toFixed(2)} (
              {data.price_change_percentage_24h.toFixed(2)}%)
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>Buy {data.symbol}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  symbol: {
    fontSize: 18,
    color: "#A9A9A9",
  },
  detailsContainer: {
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 15,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#A9A9A9",
  },
  value: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  positive: {
    color: "#4CAF50", // Green for positive change
  },
  negative: {
    color: "#FF5252", // Red for negative change
  },
  loadingText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  buyButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
