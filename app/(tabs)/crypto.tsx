import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CryptoData } from "../api/listings+api";
import { CryptoDataWithLogo } from "../api/info+api"; // Your actual datas
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";

const Crypto = () => {
  const combinedData = CryptoData?.map((crypto) => {
    const logo = CryptoDataWithLogo[1].logo;
    return [{ ...crypto, logo: logo }];
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Latest Crypto</Text>
      {CryptoData?.map((crypto) => {
        return (
          <Link
            href={{
              pathname: "/crypto/[id]",
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
              <View style={styles.cryptoPrice}>
                <Text style={styles.cryptoValue}>
                  {crypto.quote.USD.price.toFixed(2)} €
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={
                      crypto.quote.USD.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    size={16}
                    color={
                      crypto.quote.USD.percent_change_1h > 0 ? "green" : "red"
                    }
                  />
                  <Text
                    style={{
                      color:
                        crypto.quote.USD.percent_change_1h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {crypto.quote.USD.percent_change_1h.toFixed(2)} %
                  </Text>
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
