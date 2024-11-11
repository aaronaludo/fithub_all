import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = parseFloat(height) / 100;
            const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(1));
            determineStatus(bmiValue);
        }
    };

    const determineStatus = (bmiValue) => {
        if (bmiValue < 18.5) {
            setStatus('Underweight');
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            setStatus('Normal weight');
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            setStatus('Overweight');
        } else {
            setStatus('Obese');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BMI Calculator</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={(text) => setWeight(text)}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={(text) => setHeight(text)}
            />
            
            <TouchableOpacity style={styles.button} onPress={calculateBMI}>
                <Text style={styles.buttonText}>Calculate BMI</Text>
            </TouchableOpacity>
            
            {bmi && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>Your BMI: {bmi}</Text>
                    <Text style={styles.statusText}>Status: {status}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#dc3546',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    result: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 18,
        color: '#555',
    },
});

export default BMICalculator;
