import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/ProductoStyles';
import { productoService } from '../config/api';

const ProductoComponent = ({ route, navigation }) => {
  const { categoriaId, categoriaNombre } = route.params;

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    if (!categoriaId) {
      Alert.alert('Error', 'No se especificó una categoría válida', [
        { text: 'Volver', onPress: () => navigation.goBack() },
      ]);
      return;
    }

    navigation.setOptions({ title: categoriaNombre ? `Productos - ${categoriaNombre}` : 'Productos' });

    fetchProductos();
    const unsubscribe = navigation.addListener('focus', fetchProductos);
    return unsubscribe;
  }, [categoriaId, categoriaNombre, navigation]);

  const fetchProductos = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const productosData = await productoService.getByCategoria(categoriaId);

      if (!productosData || productosData.length === 0) {
        Alert.alert('Aviso', 'No hay productos disponibles en esta categoría.');
      }

      setProductos(productosData || []); 
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      Alert.alert('Error', 'No se pudieron cargar los productos');
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio.toString());
    setCantidad(producto.cantidad.toString());
    setIsModalVisible(true);
  };

  const handleDelete = async (productoId) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await productoService.delete(productoId);
              fetchProductos();
              Alert.alert('Éxito', 'Producto eliminado correctamente');
            } catch (error) {
              console.error('Error al eliminar el producto:', error);
              Alert.alert('Error', 'No se pudo eliminar el producto');
            }
          },
        },
      ]
    );
  };

  const handleSaveEdit = async () => {
    if (!nombre.trim() || isNaN(precio) || isNaN(cantidad)) {
      Alert.alert('Error', 'Todos los campos deben estar correctamente llenos.');
      return;
    }

    try {
      await productoService.update(editingProducto.id, {
        ...editingProducto,
        nombre: nombre.trim(),
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
      });
      setIsModalVisible(false);
      fetchProductos();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto');
    }
  };

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>
      <Image source={{ uri: item.imagen }} style={styles.productoImagen} resizeMode="cover" />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoCantidad}>Precio: S/{item.precio}</Text>
        <Text style={styles.productoCantidad}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.productoFecha}>
          Agregado: {new Date(item.fechaCreacion).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.productoActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleEdit(item)}
        >
          <MaterialIcons name="edit" style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleDelete(item.id)}
        >
          <MaterialIcons name="delete" style={[styles.actionIcon, { color: '#FF5252' }]} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id.toString()} 
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchProductos(true);
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay productos disponibles</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProducto', { categoriaId, categoriaNombre })}
      >
        <MaterialIcons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Producto</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Nombre" 
              value={nombre} 
              onChangeText={setNombre} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Precio" 
              value={precio} 
              onChangeText={setPrecio} 
              keyboardType="numeric" 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Cantidad" 
              value={cantidad} 
              onChangeText={setCantidad} 
              keyboardType="numeric" 
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductoComponent;
