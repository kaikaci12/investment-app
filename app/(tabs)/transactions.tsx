import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  where,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "@/context/AuthProvider";
import { auth } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
const Transactions = () => {
  const [amount, setAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const { authState } = useAuth();

  const router = useRouter();

  const handleTransaction = async (recipientEmail: string, amount: any) => {
    try {
      const currentUser = authState?.user;
      if (!currentUser) {
        console.log("No user authenticated");
        return;
      }

      const senderId = currentUser.uid;

      // Query to find the recipient by email
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("email", "==", recipientEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Recipient not found");
        return;
      }

      const recipientDoc = querySnapshot.docs[0];
      const recipientDocRef = doc(db, "users", recipientDoc.id);

      // Get the sender's document reference
      const senderDocRef = doc(db, "users", senderId);

      const transactionAmount = parseInt(amount);
      if (isNaN(transactionAmount) || transactionAmount <= 0) {
        console.log("Invalid amount entered");
        return;
      }

      // Fetch sender and recipient documents
      const senderDoc = await getDoc(senderDocRef);

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
      const senderTransaction = {
        name: "Send money",
        amount: transactionAmount,
        date: new Date().toISOString(),
      };
      const recipientTransaction = {
        name: "Recieve money",
        amount: transactionAmount,
        date: new Date().toISOString(),
      };

      await updateDoc(recipientDocRef, {
        balance: recipientBalance + transactionAmount,
        transactions: [
          ...(recipientDoc.data().transactions || []),
          recipientTransaction,
        ],
      });

      await updateDoc(senderDocRef, {
        balance: senderBalance - transactionAmount,
        transactions: [
          ...(senderDoc.data().transactions || []),
          senderTransaction,
        ],
      });

      Alert.alert(
        `Transaction successful: ${transactionAmount} sent to ${recipientEmail}`
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
        placeholder="Enter recipient Email"
        value={recipientEmail}
        onChangeText={setRecipientEmail}
      />
      <Button
        title="Send Money"
        onPress={() => handleTransaction(recipientEmail, amount)}
      />
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
