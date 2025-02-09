import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
const PlayLearn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>InvestLearn{"\n"}play & learn</Text>
        <Text style={styles.description}>
          The fun and social way to learn about investing with virtual portfolio
        </Text>
        <Image
          source={{ uri: "/assets/images/laptop.png" }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href={"/Invest"} style={styles.link}>
            Continue with Invest & Bank
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlayLearn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#2B4EFF",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#555",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
