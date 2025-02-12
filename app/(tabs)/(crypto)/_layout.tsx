import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FlatList } from "react-native";
const Crypto = () => {
  const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: "61172.18 €", change: "-0.48 %" },
    { name: "Ethereum", symbol: "ETH", price: "3397.27 €", change: "-0.28 %" },
    { name: "Tether USDt", symbol: "USDT", price: "0.92 €", change: "-0.01 %" },
    { name: "BNB", symbol: "BNB", price: "385.90 €", change: "-0.02 %" },
    { name: "Solana", symbol: "SOL", price: "119.64 €", change: "-0.07 %" },
  ];
  const renderItem = () => {};
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Latest Crypto</Text>
      {cryptoData.map((crypto, index) => (
        <Link
          href={{
            pathname: "/cryptoItem/[id]",
            params: { id: index },
          }}
          key={index}
        >
          <View key={index} style={styles.cryptoCard}>
            <View style={styles.cryptoInfo}>
              <Text style={styles.cryptoName}>{crypto.name}</Text>
              <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
            </View>
            <View style={styles.cryptoPrice}>
              <Text style={styles.cryptoValue}>{crypto.price}</Text>
              <Text style={styles.cryptoChange}>{crypto.change}</Text>
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
};

export default Crypto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cryptoCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cryptoInfo: {
    flexDirection: "column",
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cryptoSymbol: {
    fontSize: 14,
    color: "#666",
  },
  cryptoPrice: {
    alignItems: "flex-end",
  },
  cryptoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cryptoChange: {
    fontSize: 14,
    color: "#666",
  },
});
