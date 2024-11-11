import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from 'config';

const Membership = ({ navigation }) => {
    const [memberships, setMemberships] = useState([]);
    const [userMembershipMessage, setUserMembershipMessage] = useState('');
    
    const handleSelectMembership = (membership) => {
        navigation.navigate('Member Checkout', { membership });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem("MemberToken");

                const response = await axios.get(
                    `${config.API_URL}/api/members/memberships`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserMembershipMessage(response.data.membership_message);
                setMemberships(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Membership Plan:</Text>
            {/* Display user’s current membership message */}
            <Text style={styles.userMembershipText}>{userMembershipMessage}</Text>  
            {memberships.map((membership, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handleSelectMembership(membership)}
                >
                    <Text style={styles.buttonText}>
                        {membership.name}: {membership.price} {membership.currency}
                    </Text>
                </TouchableOpacity>
            ))}
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
        marginBottom: 10,
        color: '#333',
    },
    userMembershipText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#dc3546',
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default Membership;
