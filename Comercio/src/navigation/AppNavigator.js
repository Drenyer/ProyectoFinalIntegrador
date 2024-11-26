import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoriaComponent from '../components/CategoriaComponent';
import AddCategoriaComponent from '../components/AddCategoriaComponent';
import ProductoComponent from '../components/ProductoComponent';
import AddProductoComponent from '../components/AddProductoComponent';
import InicioComponent from '../components/InicioComponent';
import LoginComponent from '../components/LoginComponent';
import SignUpComponent from '../components/SignUpComponent';
import MainScreen from '../components/MainScreen';
import InformeComponent from '../components/InformeComponent'; // Importar el componente de Informe
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verify authentication state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error verifying authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'MainScreen' : 'Inicio'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1b35',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.1)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            letterSpacing: 0.5,
          },
          cardStyle: {
            backgroundColor: '#1a1b35',
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen
          name="Inicio"
          component={InicioComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginComponent}
          options={{ title: 'Iniciar sesión' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpComponent}
          options={{ title: 'Regístrate' }}
        />

        {/* Main App Screens */}
        <Stack.Screen
          name="MainScreen"
          options={{ title: 'Inicio', headerShown: false }}
        >
          {props => (
            <MainScreen
              {...props}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Categorias"
          component={CategoriaComponent}
          options={{ title: 'Categorías' }}
        />
        <Stack.Screen
          name="Producto"
          component={ProductoComponent}
          options={({ route }) => ({
            title: route.params?.categoriaNombre
              ? `Productos - ${route.params.categoriaNombre}`
              : 'Productos',
          })}
        />
        <Stack.Screen
          name="AddCategoria"
          component={AddCategoriaComponent}
          options={{ title: 'Agregar Categoría' }}
          initialParams={{ refresh: () => {} }}
        />
        <Stack.Screen
          name="AddProducto"
          component={AddProductoComponent}
          options={{ title: 'Agregar Producto' }}
          initialParams={{ refresh: () => {} }}
        />
        
        {/* Nueva pantalla: Informe */}
        <Stack.Screen
          name="Informe"
          component={InformeComponent}
          options={{ title: 'Informe' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
