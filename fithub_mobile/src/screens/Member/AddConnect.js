import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import config from 'config';

const AddConnect = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("MemberToken");

      const response = await axios.post(
        `${config.API_URL}/api/members/connects/add`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Member Connect", {
        result: response.data.message,
      });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Connect</Text>
        <Text style={styles.description}></Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddConnect;
