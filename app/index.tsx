import { Pressable, StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthProvider";
const videoSource = require("../assets/videos/7579667-uhd_2160_4096_25fps.mp4");

const Page = () => {
  const { authState } = useAuth();
  useEffect(() => {
    console.log(authState);
    if (authState?.authenticated) {
      router.push("/(tabs)");
    }
  }, []);
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={videoSource}
        isLooping
        shouldPlay
        isMuted
        resizeMode={ResizeMode.COVER}
        style={styles.video}
      />
      <Pressable
        style={styles.registerButton}
        onPress={() => router.push("/Register")}
      >
        <Text style={styles.loginText}>Sign up</Text>
      </Pressable>
      <Pressable
        style={styles.loginButton}
        onPress={() => router.push("/Login")}
      >
        <Text style={styles.loginText}>Login</Text>
      </Pressable>

      <View style={styles.centerContent}>
        <Text style={styles.title}>Welcome to InvestLearn</Text>
      </View>

      <View style={styles.bottomContent}>
        <Pressable
          style={styles.getStartedButton}
          onPress={() => router.push("/(start)/PlayLearn")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Pressable>
        <Text style={styles.footerText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus,
          fermentum arcu, placerat arcu, volutpat nec sapien. Et maecenas
          convallis ex ut nunc.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  // Login button at the top-right
  loginButton: {
    position: "absolute",
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  registerButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  loginText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },

  // Centered Welcome text
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "700",
  },

  // Get Started button and footer at the bottom
  bottomContent: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  getStartedButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B82F6", // Blue background
    paddingVertical: 12,
    height: 82,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  getStartedText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  footerText: {
    color: "#FFF",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    opacity: 0.8,
  },
});
