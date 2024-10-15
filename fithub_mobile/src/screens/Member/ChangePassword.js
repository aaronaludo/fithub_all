import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import config from 'config';

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassowrd] = useState("");
  const [newPassword, setNewPassowrd] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("MemberToken");

      const response = await axios.post(
        `${config.API_URL}/api/members/change-password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      navigation.navigate("Member Tab Navigator", { screen: "Dashboard" });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.description}></Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter old password"
          value={oldPassword}
          secureTextEntry
          onChangeText={(text) => setOldPassowrd(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter new paassword"
          value={newPassword}
          secureTextEntry
          onChangeText={(text) => setNewPassowrd(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter confirm new password"
          value={confirmNewPassword}
          secureTextEntry
          onChangeText={(text) => setConfirmNewPassword(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChangePassword;
