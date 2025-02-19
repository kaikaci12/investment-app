import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@/context/AuthProvider";
import { router, useRouter } from "expo-router";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const MainModal = ({ modalVisible, setModalVisible }: ModalProps) => {
  const { onLogout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await onLogout!();
    setModalVisible(false);
    alert("Logout Successful");
    router.push("/");
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Logout</Text>
          <Text>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push("/Profile");
              }}
            >
              <Text style={styles.buttonText}>Profile Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#2B4EFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default MainModal;
