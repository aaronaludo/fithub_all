import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Trainer/Dashboard";
import QrCode from "../screens/Trainer/QrCode";
import { Feather } from "@expo/vector-icons";
import TrainerNotification from "../screens/Trainer/Notification";
import TrainerMyClasses from "../screens/Trainer/MyClasses";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Trainer Account")}
            style={{ marginRight: 15 }}
          >
            <Feather name="user" size={24} color="black" />
          </TouchableOpacity>
        ),
        // headerLeft: () => (
        //   <TouchableOpacity
        //     onPress={() => navigation.navigate("Driver Account")}
        //     style={{ marginLeft: 15 }}
        //   >
        //     <Image
        //       source={require("../../assets/images/logo.jpg")}
        //       style={{
        //         width: 30,
        //         height: 30,
        //         borderRadius: 30,
        //       }}
        //     />
        //   </TouchableOpacity>
        // ),
        tabBarActiveTintColor: "#dc3546",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "#dc3546" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Classes"
        component={TrainerMyClasses}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="columns"
              size={24}
              color={focused ? "#dc3546" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Qr Code"
        component={QrCode}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="code"
              size={24}
              color={focused ? "#dc3546" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={TrainerNotification}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="bell"
              size={24}
              color={focused ? "#dc3546" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
