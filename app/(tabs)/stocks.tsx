import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import stocksData from "@/stocks.json"; // Import the JSON file
import { useRouter } from "expo-router";

const Stocks = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stocks</Text>
      {stocksData?.map((stock, index) => (
        <TouchableOpacity
          onPress={() => router.push(``)}
          key={index}
          style={styles.stockItem}
        >
          <View style={styles.stockInfo}>
            <Text style={styles.stockSymbol}>{stock.symbol}</Text>
            <Text style={styles.stockName}>{stock.name}</Text>
          </View>
          <View style={styles.stockPriceInfo}>
            <Text style={styles.stockPrice}>${stock.price.toFixed(2)}</Text>
            <Text
              style={[
                styles.stockChange,
                stock.change.startsWith("+")
                  ? styles.positiveChange
                  : styles.negativeChange,
              ]}
            >
              {stock.change} ({stock.changePercent})
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Stocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  stockName: {
    fontSize: 14,
    color: "#666",
  },
  stockPriceInfo: {
    alignItems: "flex-end",
  },
  stockPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  stockChange: {
    fontSize: 14,
    fontWeight: "bold",
  },
  positiveChange: {
    color: "#4CAF50", // Green for positive change
  },
  negativeChange: {
    color: "#F44336", // Red for negative change
  },
});
