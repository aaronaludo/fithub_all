import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import config from 'config';

const AddEmergency = ({ navigation }) => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("MemberToken");

      const response = await axios.post(
        `${config.API_URL}/api/members/emergencies/add`,
        {
          name: name,
          contact_number: contactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Member Emergency", {
        result: response.data.message,
      });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Emergency</Text>
        <Text style={styles.description}></Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddEmergency;
