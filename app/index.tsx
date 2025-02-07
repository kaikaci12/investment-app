import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <View>
      <SafeAreaView>
        <Text>Hello world</Text>
      </SafeAreaView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
