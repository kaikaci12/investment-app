import { Pressable, StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Choose where you’d like to start</Text>

        <Pressable style={styles.optionButton}>
          <Text style={styles.optionTitle}>Play & Learn</Text>
          <Text style={styles.optionDescription}>
            Learn how to invest by playing{"\n"}Fantasy learn finance
          </Text>
        </Pressable>

        <Pressable style={styles.optionButton}>
          <Text style={styles.optionTitle}>Invest & Bank</Text>
          <Text style={styles.optionDescription}>
            Invest, bank and buy crypto with an{"\n"}InvestLearn account
          </Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.footerLink}>Log in here</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F3A60",
    marginBottom: 30,
    textAlign: "center",
  },

  // Option Buttons
  optionButton: {
    backgroundColor: "#2F528F",
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 10,
  },
  optionDescription: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
  },

  // Footer
  footer: {
    paddingVertical: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#1F3A60",
  },
  footerLink: {
    color: "#3B82F6", // Blue link color
    fontWeight: "700",
  },
});
