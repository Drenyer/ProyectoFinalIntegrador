import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { authService } from '../config/api'; // Servicio para la API

const SignUpComponent = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await authService.register(email, password); // Llama al servicio de registro
            Alert.alert('Registro exitoso', 'Usuario registrado correctamente');
            navigation.navigate('Login'); // Redirige a la página de inicio de sesión
        } catch (error) {
            Alert.alert('Error', error.message); // Muestra un error si ocurre
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/fondo2.png')} // Ruta del fondo
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Logo */}
                <Image 
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />

                {/* Campo de correo electrónico */}
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Campo de contraseña */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Botón de registro */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpText}>Regístrate</Text>
                </TouchableOpacity>

                {/* Enlace para volver a iniciar sesión */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión.</Text>
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
    signUpButton: {
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
    signUpText: {
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

export default SignUpComponent;
