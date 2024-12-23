import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from 'config';

export default function Account({ navigation }) {
  const [userData, setUserData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    role_id: null,
    status_id: null,
    created_at: null,
    updated_at: null,
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("MemberData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handleLogout = async () => {
    // await AsyncStorage.removeItem("MemberToken");
    // await AsyncStorage.removeItem("MemberData");
    // navigation.navigate("Member Login");
    try {
      const token = await AsyncStorage.getItem("MemberToken");
      if (token) {
        const response = await axios.get(
          `${config.API_URL}/api/members/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.message === "Successfully logged out") {
          await AsyncStorage.removeItem("MemberToken");
          await AsyncStorage.removeItem("MemberData");
          navigation.navigate("Member Login");
        } else {
          console.error("Logout failed:", response.data.message);
        }
      } else {
        console.error("No authentication token found");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require("../../../assets/images/profile.jpg")}
          style={styles.image}
        /> */}
        <Text
          style={styles.title}
        >{`${userData.first_name} ${userData.last_name}`}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Member Account Information")}
        >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="user"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>Account Information</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Member Change Password")}
        >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="unlock"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>Change Password</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer} 
          onPress={() => navigation.navigate("Member BMI Calculator")}
          >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="plus-square"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>BMI Calculator</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer} 
          onPress={() => navigation.navigate("Member Membership")}
          >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="check-square"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>Membership</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Member Emergency", {
              result: "",
            })
          }
        >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="compass"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>Emergency</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate("Member Connect", {
              result: "",
            })
          }
        >
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="users"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>Connects</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="chevrons-left"
                size={24}
                color="black"
                style={{ marginRight: 30, color: "#dc3546" }}
              />
              <Text style={styles.buttonText}>Logout</Text>
            </View>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#dc3546",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonsContainer: {
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    // alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    width: "100%",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
