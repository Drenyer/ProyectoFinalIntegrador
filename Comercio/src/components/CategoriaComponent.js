import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator,Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/CategoriaStyles';
import { categoriaService } from '../config/api';

const CategoriaComponent = ({ navigation }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategorias = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const data = await categoriaService.getAll();

      if (!data || data.length === 0) {
        Alert.alert('Aviso', 'No hay categorías disponibles en este momento.');
      }

      setCategorias(data || []);
    } catch (error) {
      console.error('Error fetching categorias:', error);
      Alert.alert('Error', error.message || 'No se pudieron cargar las categorías');
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategorias();
    const unsubscribe = navigation.addListener('focus', fetchCategorias);
    return unsubscribe;
  }, [navigation]);

  const handleDeleteCategoria = async (categoriaId) => {
    try {
      await categoriaService.delete(categoriaId);
      setCategorias(prev => prev.filter(cat => cat.id !== categoriaId));
      Alert.alert('Éxito', 'Categoría eliminada correctamente');
    } catch (error) {
      console.error('Error deleting categoria:', error);
      Alert.alert('Error', error.message || 'No se pudo eliminar la categoría');
    }
  };

  const handleCategoriaPress = (categoria) => {
    navigation.navigate('Producto', { 
      categoriaId: categoria.id,
      categoriaNombre: categoria.nombre 
    });
  };
  
  const renderCategoria = ({ item }) => (
    <TouchableOpacity
      style={styles.categoriaContainer}
      onPress={() => handleCategoriaPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imagen }}
          style={styles.categoriaImagen}
          resizeMode="cover"
        />
      </View>
  
      <View style={styles.categoriaInfo}>
        <Text style={styles.categoriaNombre}>{item.nombre}</Text>
        <Text style={styles.categoriaDescripcion}>{item.descripcion}</Text>
        <Text style={styles.categoriaFecha}>
          Creado: {new Date(item.fechaCreacion).toLocaleDateString()}
        </Text>
      </View>
  
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que deseas eliminar esta categoría?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: () => handleDeleteCategoria(item.id) }
            ]
          );
        }}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        renderItem={renderCategoria}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay categorías disponibles</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchCategorias(true);
        }}
      />
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCategoria')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoriaComponent;
