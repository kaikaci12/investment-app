import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CryptoData } from "../api/listings+api";
import data from "@/crypto.json";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";

const Crypto = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Latest Crypto</Text>
      {data?.map((crypto) => {
        return (
          <Link
            href={{
              pathname: `/crypto/[id]`,
              params: { id: crypto.id },
            }}
            key={crypto.id}
            asChild
          >
            <View style={styles.cryptoCard}>
              <View style={styles.cryptoInfo}>
                <Image
                  source={{ uri: crypto.logo }}
                  style={styles.cryptoLogo}
                />

                <View>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                </View>
              </View>
            </View>
          </Link>
        );
      })}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
});
