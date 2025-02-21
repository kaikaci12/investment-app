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
import { db } from "@/firebaseConfig";
import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the upload icon
import AntDesign from "@expo/vector-icons/AntDesign";

import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (authState?.authenticated) {
      setCurrentUser(authState.user.profile);
      setUsername(authState.user.profile.username);
      setAvatar(authState.user.profile.avatarUrl);
    }
  }, [authState]);

  const updateUserProfile = async (username: string, avatar: string) => {
    if (!authState?.user?.uid) return;
    try {
      const userRef = doc(db, "users", authState.user.uid);

      await updateDoc(userRef, { username, avatarUrl: avatar }); //
      setCurrentUser((prev: any) => {
        const updatedUser = { ...prev, username, avatarUrl: avatar };

        AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser))
          .then(() => console.log("Current user saved to AsyncStorage"))
          .catch((error) =>
            console.error("Error saving to AsyncStorage:", error)
          );

        return updatedUser;
      });

      alert("Profile Updated Succesfully");
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
    let data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: "profile.jpg",
    } as any); // ✅ Use `uri` instead of blob
    data.append("upload_preset", "investment-app");

    try {
      let response = await fetch(
        "https://api.cloudinary.com/v1_1/dedukqhbm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      let result = await response.json();
      if (result.secure_url) {
        setAvatar(result.secure_url);
      }
      console.log(result.secure_url);
      alert("Image uploaded successfully ✅");
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    }
  };

  const removeAvatar = async () => {
    setAvatar("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Edit Avatar Picture</Text>
        <TouchableOpacity
          onPress={pickImageAsync}
          style={styles.avatarContainer}
        >
          <Image
            source={{
              uri: avatar || "https://via.placeholder.com/150",
            }}
            style={styles.avatar}
          />
          {!avatar && (
            <View style={styles.avatarOverlay}>
              <Ionicons name="camera" size={32} color="white" />
            </View>
          )}
        </TouchableOpacity>
        {avatar && (
          <TouchableOpacity onPress={removeAvatar} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove Avatar</Text>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Edit Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          onPress={() => updateUserProfile(username, avatar)}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  avatarContainer: {
    alignItems: "center",
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
    left: 100,
    right: 0,
    bottom: 0,
    width: 150,
    height: 150,
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
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#ff4444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
