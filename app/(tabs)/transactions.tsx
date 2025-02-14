import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  const handleTransaction = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("No user authenticated");
        return;
      }

      const senderId = currentUser.uid; // Current user (sender)
      const recipientId = recipient; // Assuming recipient is their userId (e.g., recipient's UID)

      // Fetch recipient's document from Firestore
      const recipientDocRef = doc(db, "users", recipientId);
      const senderDocRef = doc(db, "users", senderId);

      // Convert amount to a number
      const transactionAmount = parseFloat(amount);
      if (isNaN(transactionAmount) || transactionAmount <= 0) {
        console.log("Invalid amount entered");
        return;
      }

      // Fetch sender and recipient balances and update them
      const recipientDoc = await getDoc(recipientDocRef);
      const senderDoc = await getDoc(senderDocRef);

      if (!recipientDoc.exists()) {
        console.log("Recipient not found");
        return;
      }

      if (!senderDoc.exists()) {
        console.log("Sender not found");
        return;
      }

      const recipientBalance = recipientDoc.data().balance || 0;
      const senderBalance = senderDoc.data().balance || 0;

      // Check if sender has enough balance
      if (senderBalance < transactionAmount) {
        console.log("Insufficient balance");
        return;
      }

      // Update balances
      await updateDoc(recipientDocRef, {
        balance: recipientBalance + transactionAmount,
      });

      await updateDoc(senderDocRef, {
        balance: senderBalance - transactionAmount,
      });

      console.log(
        `Transaction successful: ${transactionAmount} sent to ${recipient}`
      );
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter recipient (User ID)"
        value={recipient}
        onChangeText={setRecipient}
      />
      <Button title="Send Money" onPress={handleTransaction} />
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
