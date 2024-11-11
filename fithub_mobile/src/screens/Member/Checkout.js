import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from 'config';

const Checkout = ({ route, navigation }) => {
    const { membership } = route.params;
    const [error, setError] = useState("");
    console.log(error);
    console.log(membership);

    const handleConfirm = () => {
        alert(`Thank you for choosing the ${membership.name} membership!`);
        navigation.goBack();
    };

    const handleSubmit = async () => {
        setError("");
        try {
            const token = await AsyncStorage.getItem("MemberToken");
        
            const response = await axios.post(
                `${config.API_URL}/api/members/memberships/checkout`,
                {
                    membership_id: membership.id,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );

            navigation.replace("Member Membership");  //when i go the Member Membership i want to reload that page
        } catch (error) {
            alert(error.response.data.message);
            setError(error.response.data.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.membership}>Selected Membership: {membership.name}</Text>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Confirm and Pay</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    membership: {
        fontSize: 20,
        color: '#555',
        marginBottom: 30,
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#dc3546',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default Checkout;
