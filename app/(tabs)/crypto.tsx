import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router"; // Import useRouter
import React, { useEffect, useState } from "react";
import cryptoData from "@/crypto.json";
import { SafeAreaView } from "react-native-safe-area-context";

const LatestCrypto = () => {
  const [data, setData] = useState<any>([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Simulate fetching data
    setData(cryptoData);
  }, []);

  const handlePress = (id: number) => {
    // Navigate programmatically
    router.push(`/crypto/${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Latest Crypto</Text>

      {data?.map((crypto: any) => (
        <View key={crypto.id} style={styles.cryptoCard}>
          <TouchableOpacity
            onPress={() => handlePress(crypto.id)} // Use onPress to navigate
            style={styles.cryptoInfo}
          >
            <Image source={{ uri: crypto.logo }} style={styles.cryptoLogo} />
            <View>
              <Text style={styles.cryptoName}>{crypto.name}</Text>
              <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default LatestCrypto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  cryptoCard: {
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  cryptoInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cryptoSymbol: {
    fontSize: 14,
    color: "#A9A9A9",
  },
});
