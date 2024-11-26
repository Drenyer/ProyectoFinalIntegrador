import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = ({ navigation, setIsAuthenticated  }) => {
    // Validar si el token existe
    const validateToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Sesión Expirada', 'Por favor, inicia sesión nuevamente.');
                navigation.navigate('Login'); // Redirige al login si no hay token
            }
        } catch (error) {
            console.error('Error validando el token:', error);
            navigation.navigate('Login');
        }
    };

    useEffect(() => {
        validateToken(); // Validar token al cargar la pantalla
    }, []);

    // Cerrar sesión
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token'); // Clear token
            setIsAuthenticated(false); // Update authentication state
            Alert.alert('Sesión Cerrada', 'Has cerrado sesión correctamente.');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Reset to Login screen
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    
    

    return (
        <ImageBackground 
            source={require('../../assets/fondo3.png')} 
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Inicio</Text>
                
                {/* Botones principales */}
                <View style={styles.grid}>
                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => navigation.navigate('Categorias')}
                    >
                        <Text style={styles.cardText}>Bienes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => console.log('Navegar a Ventas')}
                    >
                        <Text style={styles.cardText}>Ventas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => console.log('Navegar a Clientes')}
                    >
                        <Text style={styles.cardText}>Cliente</Text>
                    </TouchableOpacity>

                    {/* Botón para navegar a la pantalla Informe */}
                 <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => navigation.navigate('Informe')} // Cambiado para navegar a Informe
                    >
                        <Text style={styles.cardText}>Informe</Text>
                    </TouchableOpacity>
                </View>

                {/* Botón de Cerrar Sesión */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 30,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 150,
        height: 150,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, 
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4F378A', 
    },
    logoutButton: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#FF4F4F',
        borderRadius: 25,
        alignItems: 'center',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MainScreen;
