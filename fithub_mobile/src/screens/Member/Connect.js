import React, { useState, useEffect } from "react";
import Box from "../../components/Box";
import { styles } from "../../styles/Box";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from 'config';

const Connect = ({ navigation, route }) => {
  const { result } = route.params;
  const [connects, setConnects] = useState([]);
  const [render, setRender] = useState(null);

  console.log(connects);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("MemberToken");

        const response = await axios.get(
          `${config.API_URL}/api/members/connects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response.data.emergencies);
        setConnects(response.data.connects);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [result, render]);

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("MemberToken");

      const response = await axios.delete(
        `${config.API_URL}/api/members/connects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRender(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Box
        container={styles.container}
        title={styles.title}
        description={styles.description}
        titleLabel="Add Connections"
        descriptionLabel="add more riders for the better."
        navigation={navigation}
        buttonContainer={styles.buttonContainer}
        buttonText={styles.buttonText}
        buttonTextLabel={"Add"}
        buttonNavigation={"Member Add Connect"}
      />
      <View style={styles2.table}>
        <View style={styles2.headerRow}>
          <Text style={styles2.headerCell}>ID</Text>
          <Text style={styles2.headerCell}>Sender</Text>
          <Text style={styles2.headerCell}>Receiver</Text>
          <Text style={styles2.headerCell}>Actions</Text>
        </View>
        {connects.map((item) => (
          <View style={styles2.row} key={item.id}>
            <Text style={styles2.cell}>{item.id}</Text>
            <Text style={styles2.cell}>
              {item.sender.first_name} {item.sender.last_name}
            </Text>
            <Text style={styles2.cell}>
              {item.receiver.first_name} {item.receiver.last_name}
            </Text>
            <View style={styles2.cell}>
              <TouchableOpacity style={styles2.button}>
                <Text style={styles2.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles2.button}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles2.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderWidth: 1,
    borderBlockColor: "#d0d4dc",
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
    backgroundColor: "#fffcfc",
  },
  row: {
    flexDirection: "row",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
  },
  button: {
    marginBottom: 6,
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Connect;
