import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,ScrollView,Alert,KeyboardAvoidingView,Platform,ActivityIndicator} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/AddCategoriaStyles';
import { categoriaService } from '../config/api';

const AddCategoriaComponent = ({ navigation }) => {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [fechaCreacion] = useState(new Date().toLocaleDateString());

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a las imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!imagen || !nombre.trim() || !descripcion.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('imagen', {
        uri: imagen,
        type: 'image/jpeg',
        name: `imagen-${Date.now()}.jpg`,
      });
      formData.append('nombre', nombre.trim());
      formData.append('descripcion', descripcion.trim());

      await categoriaService.create(formData);

      Alert.alert('Éxito', 'Categoría creada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar la categoría');
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
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre de la categoría</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej: Electrónicos"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Describe la categoría..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              multiline
              numberOfLines={4}
              maxLength={200}
            />
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              Fecha de creación: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6c63ff" />
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>Guardar Categoría</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCategoriaComponent;
