import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "@/firebaseConfig";
import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the upload icon

const Profile = () => {
  const { authState } = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (authState?.authenticated) {
      setCurrentUser(authState.user.profile);
      setUsername(authState.user.profile.username);
      setAvatar(authState.user.profile.avatar);
    }
  }, [authState]);

  const updateUserProfile = async (username: string) => {
    if (!authState?.user?.uid) return;
    try {
      const userRef = doc(db, "users", authState.user.uid);
      await updateDoc(userRef, { username });
      setCurrentUser((prev: any) => ({ ...prev, username }));
      console.log(currentUser);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
      alert("You did not select an image");
      return;
    }
    uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri: string) => {
    if (!authState?.user?.uid) return;
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `avatars/${authState.user.uid}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setAvatar(downloadURL);
      console.log("image url: ", downloadURL);
      updateUserProfile(downloadURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageAsync} style={styles.avatarContainer}>
        <Image
          source={{
            uri: avatar || "https://via.placeholder.com/150",
          }}
          style={styles.avatar}
        />
        <View style={styles.avatarOverlay}>
          <Ionicons name="camera" size={32} color="white" />
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter new username"
      />
      <TouchableOpacity
        onPress={() => updateUserProfile(username)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 75,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
