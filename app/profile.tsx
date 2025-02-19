import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import * as ImagePicker from "expo-image-picker";
const profile = () => {
  const { authState } = useAuth();
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    if (authState?.authenticated) {
      setCurrentUser(authState.user.profile);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>profile</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
