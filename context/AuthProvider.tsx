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
import { collection, addDoc } from "firebase/firestore";
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

  // Register function using Firebase Auth
  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,

        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      console.log("Username", user.displayName);

      const token = await user.getIdToken();
      SecureStore.setItem(TOKEN_KEY, token);
      setAuthState({
        user,
        token,
        authenticated: true,
      });

      console.log("User registered successfully", user);
      const docRef = await addDoc(collection(db, "users"), {
        username: user.displayName || "johndoe",
        email: user.email,
        avatarUrl: user.photoURL || "/assets/images/avatar.png",
        transactions: [],
        balance: 0,
      });
      if (docRef) {
        console.log("Document written with ID: ", docRef.id);
      }
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
