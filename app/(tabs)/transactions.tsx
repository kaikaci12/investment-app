import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";

const Transactions = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <TextInput style={styles.input} placeholder="Enter recipient" />
      <Button title="Send Money" onPress={() => {}} />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  button: {
    marginTop: 12,
  },
});
