import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

const QrCode = () => {
  const [qrCode, setQrCode] = useState("_");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("clockin");

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (email) {
      setQrCode(`${email}_${mode}`);
    }
  }, [email, mode]);

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("TrainerData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setEmail(parsedUserData.email);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Code for {mode === "clockin" ? "Clock In" : "Clock Out"}</Text>

      <View style={styles.qrContainer}>
        <QRCode value={qrCode} size={200} />
      </View>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, mode === "clockin" && styles.activeButton]}
          onPress={() => setMode("clockin")}
        >
          <Text style={[styles.switchText, mode === "clockin" && styles.activeText]}>Clock In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, mode === "clockout" && styles.activeButton]}
          onPress={() => setMode("clockout")}
        >
          <Text style={[styles.switchText, mode === "clockout" && styles.activeText]}>Clock Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  qrContainer: {
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  switchContainer: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    padding: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  switchText: {
    fontSize: 16,
    color: "#666",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default QrCode;
