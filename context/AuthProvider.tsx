import React, {
  useState,
  useEffect,
  type PropsWithChildren,
  useContext,
} from "react";
import * as SecureStore from "expo-secure-store";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const TOKEN_KEY = "my-jwt";

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

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          user: null,
          token,
          authenticated: true,
        });
        console.log("Stored token loaded:", token);
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,

        password
      );
      const user = userCredential.user;

      console.log("User registered:", user);

      const token = await user.getIdToken();
      SecureStore.setItem(TOKEN_KEY, token);

      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      const profile = {
        username: user.displayName || "johndoe",
        email: user.email,
        avatarUrl: user.photoURL || "/assets/images/avatar.png",
        transactions: [],
        balance: 0,
        createdAt: new Date().toISOString(),
      };

      if (!userDoc.exists()) {
        await setDoc(docRef, profile);
        console.log("✅ User profile created in Firestore:", profile);
      } else {
        console.log("⚠️ User already exists in Firestore:", userDoc.data());
      }

      setAuthState({
        token,
        authenticated: true,
        user: {
          ...user,
          profile,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      setAuthState({
        user,
        token,
        authenticated: true,
      });

      SecureStore.setItem(TOKEN_KEY, token);
      console.log("User logged in successfully, Token:", token);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logOut = async () => {
    try {
      const result = await signOut(auth);
      setAuthState({
        user: null,
        token: null,
        authenticated: false,
      });
      console.log(result);
      console.log("User logged out successfully");
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

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
