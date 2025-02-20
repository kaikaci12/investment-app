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

  const updateUserProfile = async (username: string, avatar: string) => {
    if (!authState?.user?.uid) return;
    try {
      const userRef = doc(db, "users", authState.user.uid);
      await updateDoc(userRef, { username, avatarUrl: avatar }); //
      setCurrentUser((prev: any) => ({ ...prev, username, avatarUrl: avatar })); // 🔹 Keep it consistent
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
        await updateUserProfile(username, result.secure_url); // ✅ Save avatar immediately
      }

      alert("Image uploaded successfully ✅");
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    }
  };

  const removeAvatar = async () => {
    setAvatar("");
    await updateUserProfile(username, ""); // Remove avatar URL from the profile
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.editContainer}>
        <Text style={styles.editText}>Edit Avatar Picture</Text>
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
      </View>

      {avatar && (
        <TouchableOpacity onPress={removeAvatar} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove Avatar</Text>
        </TouchableOpacity>
      )}
      <View style={styles.editContainer}>
        <Text>Edit Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter new username"
        />
      </View>

      <TouchableOpacity
        onPress={() => updateUserProfile(username, avatar)}
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

    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
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
  removeButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  editContainer: {
    flexDirection: "column",

    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  editText: {
    fontSize: 16,
    fontWeight: "condensed",
  },
});
