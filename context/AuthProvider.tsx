import React, {
  useState,
  useEffect,
  type PropsWithChildren,
  useContext,
} from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const TOKEN_KEY = "my-jwt";
const USER_KEY = "currentUser";

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user: any; // User object with uid and profile data
  }>({
    token: null,
    authenticated: null,
    user: null,
  });

  // 🚀 Load User on App Start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const currentUser = await AsyncStorage.getItem(USER_KEY);
        const parsedUser = currentUser ? JSON.parse(currentUser) : null;

        if (!token || !parsedUser) {
          setAuthState({
            user: null,
            token: null,
            authenticated: false,
          });
          return;
        }

        setAuthState({
          user: parsedUser,
          token,
          authenticated: true,
        });
        console.log("✅ Current User Loaded: ", parsedUser);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // ✅ User Registration
  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Store Token Securely
      await SecureStore.setItemAsync(TOKEN_KEY, token);

      // Create User Profile
      const profile = {
        uid: user.uid, // Include uid in the profile
        username: user.displayName || "johndoe",
        email: user.email,
        avatarUrl: user.photoURL || "/assets/images/avatar.png",
        transactions: [],
        balance: 1000,
        createdAt: new Date().toISOString(),
      };

      // Save Profile to Firestore
      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        await setDoc(docRef, profile);
        console.log("✅ User profile created in Firestore");
      }

      // Store User Info in AsyncStorage
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(profile));

      // Update Auth State
      setAuthState({
        token,
        authenticated: true,
        user: profile, // Simplified user object
      });

      console.log("✅ User registered successfully");
    } catch (error: any) {
      console.error("Registration error:", error.message);
      throw new Error(error.message);
    }
  };

  // ✅ User Login
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Store Token Securely
      await SecureStore.setItemAsync(TOKEN_KEY, token);

      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        throw new Error("⚠️ User profile not found in Firestore");
      }

      const userData = userDoc.data();
      userData.uid = user.uid; // Include uid in the user data

      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));

      // Update Auth State
      setAuthState({
        token,
        authenticated: true,
        user: userData,
      });

      console.log("✅ User logged in successfully", userData);
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  };

  const logOut = async () => {
    try {
      // Clear Tokens & User Data
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      await signOut(auth);

      // Update Auth State
      setAuthState({
        user: null,
        token: null,
        authenticated: false,
      });

      console.log("✅ User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Context Value
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logOut,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
