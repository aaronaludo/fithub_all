import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/Form";

const Login = ({ navigation }) => {
  return (
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.description}>Pick Role.</Text>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("Member Login")}
        >
          <Text style={styles.inputButtonText}>Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => navigation.navigate("Trainer Login")}
        >
          <Text style={styles.inputButtonText}>Trainer</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
