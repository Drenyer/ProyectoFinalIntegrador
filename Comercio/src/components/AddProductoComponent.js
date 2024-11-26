import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,ScrollView,Alert,KeyboardAvoidingView,Platform} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/AddProductoStyles';
import { productoService } from '../config/api';

const AddProductoComponent = ({ route, navigation }) => {
  const { categoriaId, categoriaNombre } = route.params;
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const validarCampos = () => {
    if (!nombre.trim() || !precio || !cantidad || !imagen) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    if (isNaN(precio) || parseFloat(precio) <= 0) {
      Alert.alert('Error', 'El precio debe ser un número positivo');
      return false;
    }
    if (isNaN(cantidad) || parseInt(cantidad) <= 0) {
      Alert.alert('Error', 'La cantidad debe ser un número entero positivo');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validarCampos()) return;

    setLoading(true);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('imagen', {
        uri: imagen,
        type: 'image/jpeg',
        name: `producto-${Date.now()}.jpg`,
      });
      formData.append('nombre', nombre.trim());
      formData.append('precio', precio);
      formData.append('cantidad', cantidad);
      formData.append('categoriaId', categoriaId);

      await productoService.create(formData);

      Alert.alert('Éxito', 'Producto agregado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error al crear producto:', error);
      Alert.alert('Error', `No se pudo guardar el producto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={pickImage}
        >
          {imagen ? (
            <Image source={{ uri: imagen }} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer}>
              <MaterialIcons name="add-photo-alternate" size={40} color="#rgba(255, 255, 255, 0.7)" />
              <Text style={styles.placeholderText}>Añadir imagen</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.categoriaText}>
            Categoría: {categoriaNombre}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre del producto</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej: Smartphone XYZ"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Precio</Text>
            <TextInput
              style={styles.input}
              value={precio}
              onChangeText={setPrecio}
              placeholder="0.00"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              keyboardType="decimal-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput
              style={styles.input}
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="0"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
  
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              Fecha de creación: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProductoComponent;
