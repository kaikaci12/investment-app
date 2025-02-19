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
    user: any;
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
        console.log("currentUser: ", parsedUser);

        setAuthState({
          user: parsedUser,
          token,
          authenticated: true,
        });
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);

  // ✅ Register New User
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
        username: user.displayName || "johndoe",
        email: user.email,
        avatarUrl: user.photoURL || "/assets/images/avatar.png",
        transactions: [],
        balance: 1000,
        createdAt: new Date().toISOString(),
      };

      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        await setDoc(docRef, profile);
        console.log("✅ User profile created in Firestore");
      }

      // Store User Info in AsyncStorage
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({
          uid: user.uid,
          profile,
        })
      );

      // Update State
      setAuthState({
        token,
        authenticated: true,
        user: {
          uid: user.uid,
          profile,
        },
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

      // Fetch User Profile
      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        throw new Error("⚠️ User profile not found in Firestore");
      }

      const userData = userDoc.data();

      // Store User Info in AsyncStorage
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({
          uid: user.uid,
          profile: userData,
        })
      );

      // Update Auth State
      setAuthState({
        user: {
          uid: user.uid,
          profile: userData,
        },
        token,
        authenticated: true,
      });

      console.log("✅ User logged in successfully");
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  };

  // ✅ User Logout
  const logOut = async () => {
    try {
      // Clear Tokens & User Data
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      await signOut(auth);

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
