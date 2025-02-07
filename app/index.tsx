import { Button, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
const videoSource = require("../assets/videos/7579667-uhd_2160_4096_25fps.mp4");

const Page = () => {
  // Initialize the video player with looping and autoplay enabled

  return (
    <View style={styles.container}>
      <Pressable style={styles.login}>Login</Pressable>
      <Video
        isLooping
        source={videoSource}
        isMuted
        style={styles.video}
        shouldPlay
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  login: {
    display: "flex",
    width: 111,
    height: 26,
    flexDirection: "column",
    justifyContent: "center",
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",

    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 12,
    borderColor: "white",
    borderWidth: 1,
  },
});
