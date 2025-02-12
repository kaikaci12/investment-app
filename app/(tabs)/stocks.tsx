import { StyleSheet, Text, View } from "react-native";
import React from "react";

const stocks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stocks</Text>
      <View style={styles.stockItem}>
        <Text style={styles.stockName}>AAPL</Text>
        <Text style={styles.stockPrice}>$150.00</Text>
      </View>
      <View style={styles.stockItem}>
        <Text style={styles.stockName}>GOOGL</Text>
        <Text style={styles.stockPrice}>$2800.00</Text>
      </View>
      <View style={styles.stockItem}>
        <Text style={styles.stockName}>AMZN</Text>
        <Text style={styles.stockPrice}>$3400.00</Text>
      </View>
    </View>
  );
};

export default stocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  stockName: {
    fontSize: 18,
  },
  stockPrice: {
    fontSize: 18,
  },
});
