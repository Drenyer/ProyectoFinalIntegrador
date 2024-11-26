import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InicioComponent = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../assets/fondoInicio.png')} // Imagen para el fondo
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Logo de la aplicación */}
                <Image 
                    source={require('../../assets/logo.png')} // Ruta del logo
                    style={styles.logo}
                />
                <Text style={styles.title}>WunderLager</Text>
                <Text style={styles.subtitle}>Let's get you home</Text>
                                
                {/* Botones de Facebook y Google */}
                {/* 
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Icon name="facebook" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Icon name="google" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                */}
                {/* Botón de Sign In */}
                <TouchableOpacity 
                    style={[styles.button, styles.signInButton]} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.signInText}>Iniciar sesión</Text>
                </TouchableOpacity>
                {/* Enlaces debajo de los botones */}
                <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signUpText}>Regístrate</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>  
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { alignItems: 'center' },
    logo: {
        width: 100, 
        height: 100,
        marginBottom: 20,
    },
    title: { fontSize: 40, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
    subtitle: { fontSize: 18, color: '#fff', marginBottom: 100 },
    buttonContainer: { flexDirection: 'row', marginBottom: 20 },
    button: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        borderRadius: 50,
        marginHorizontal: 30,
        paddingHorizontal: 30,
    },
    signInButton: {
        backgroundColor: '#4F378A', 
        width: '80%', 
        padding: 10,
        alignItems: 'center',
        paddingHorizontal: 100,
        marginBottom: 30, 
        marginTop: 50,
    },
    signInText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: '#4F378A', 
        width: '80%', 
        padding: 10,
        alignItems: 'center',
        paddingHorizontal: 100,
        marginBottom: 30, 
        marginTop: 0,
    },
    signUpText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default InicioComponent;
