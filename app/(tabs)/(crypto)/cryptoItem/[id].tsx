import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
const CoinData = () => {
  const { id, crypto } = useLocalSearchParams();
  return (
    <View>
      <Text style={{ color: "white" }}>the crypto coin the id of {id}</Text>
    </View>
  );
};

export default CoinData;

const styles = StyleSheet.create({
  cointainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
