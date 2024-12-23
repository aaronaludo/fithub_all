import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import config from 'config';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("MemberToken");
    if (token) {
      navigation.navigate("Member Tab Navigator", { screen: "Dashboard" });
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${config.API_URL}/api/members/login`,
        {
          email,
          password,
        }
      );
      const { token, user } = response.data.response;

      await AsyncStorage.setItem("MemberToken", token);
      await AsyncStorage.setItem("MemberData", JSON.stringify(user));

      setEmail("");
      setPassword("");
      navigation.navigate("Member Tab Navigator", { screen: "Dashboard" });
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Welcome Member!</Text>
        <Text style={styles.description}>Login to continue.</Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleLogin}>
          <Text style={styles.inputButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>
          Don't have an Account?{" "}
          <Text
            style={styles.subInputText}
            onPress={() => navigation.navigate("Member Registration")}
          >
            Register
          </Text>
        </Text>
      </View>
    </>
  );
};

export default Login;
