import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../config/api'; // Import authentication service

const LoginComponent = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
        // Call the login service to get the token
        const { token } = await authService.login(email, password);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', token);

        Alert.alert('Inicio de sesión exitoso', `Bienvenido, ${email}`);

        // Navigate to MainScreen
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
        });
        } catch (error) {
        Alert.alert('Error', error.message);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/fondo1.png')}
            style={styles.background}
        >
        <View style={styles.container}>
            {/* Logo */}
            <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            />

            {/* Email Input */}
            <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            />

            {/* Sign-In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            {/* Sign-Up Link */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>¿No tienes una cuenta?</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 100,
    },
    input: {
        width: '90%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        color: '#333',
    },
    signInButton: {
        width: '90%',
        padding: 15,
        backgroundColor: '#4F378A',
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    signInText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 40,
    },
});

export default LoginComponent;
