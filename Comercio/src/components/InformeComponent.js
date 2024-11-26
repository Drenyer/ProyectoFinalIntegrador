import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Alert, ActivityIndicator } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing'; // Para compartir archivos
import styles from '../styles/InformeStyles';
import { filtrarProductos } from '../config/api';

const InformeComponent = () => {
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFiltrar = async () => {
    if (!filtroNombre && !filtroFecha) {
      Alert.alert('Error', 'Por favor ingresa al menos un filtro.');
      return;
    }
  
    try {
      setLoading(true);
      const filtros = {
        nombre: filtroNombre.trim(),
        fecha: filtroFecha.trim(),
      };
  
      const productosFiltrados = await filtrarProductos(filtros); // Llama a la API para obtener productos filtrados
      console.log('Productos filtrados:', productosFiltrados); // Debugging: verifica qué datos llegan
      setProductos(productosFiltrados);
    } catch (error) {
      console.error('Error al filtrar productos:', error);
      Alert.alert('Error', 'No se pudieron filtrar los productos.');
    } finally {
      setLoading(false);
    }
  };
  

  const generarPDF = async () => {
    if (productos.length === 0) {
      Alert.alert('Aviso', 'No hay productos para generar un informe.');
      return;
    }
  
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #1a1b35;
              color: #fff;
              margin: 20px;
            }
            h2 {
              text-align: center;
              color: #fff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
              color: #fff;
            }
            th {
              background-color: #4CAF50;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #333;
            }
          </style>
        </head>
        <body>
          <h2>Informe de Productos Filtrados</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${productos
                .map(
                  (producto) => `
                    <tr>
                      <td>${producto.nombre || 'N/A'}</td>
                      <td>S/${producto.precio || 0}</td>
                      <td>${producto.cantidad || 0}</td>
                      <td>${new Date(producto.fechaCreacion).toLocaleDateString() || 'N/A'}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
      // Intentar abrir el PDF directamente
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri); // Esto abre una ventana para compartir el archivo
      } else {
        console.log('El PDF ha sido generado en:', uri); // Esto es útil para depuración
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      Alert.alert('Error', 'No se pudo generar el PDF.');
    }
  };
  
  

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>
      <Text style={styles.productoNombre}>{item.nombre}</Text>
      <Text style={{ color: '#FFFFFF' }}>Precio: S/${item.precio}</Text>
      <Text style={{ color: '#FFFFFF' }}>Cantidad: {item.cantidad}</Text>
      <Text style={{ color: '#FFFFFF' }}>Fecha: {new Date(item.fechaCreacion).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#1a1b35' }]}>
      <Text style={styles.title}>Filtrar Productos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        placeholderTextColor="#ccc"
        value={filtroNombre}
        onChangeText={setFiltroNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha Exacta (YYYY-MM-DD)"
        placeholderTextColor="#ccc"
        value={filtroFecha}
        onChangeText={setFiltroFecha}
      />
      <TouchableOpacity style={styles.botonFiltrar} onPress={handleFiltrar}>
        <Text style={styles.botonTexto}>Filtrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonDescargar} onPress={generarPDF}>
        <Text style={styles.botonTexto}>Descargar PDF</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <FlatList
          data={productos}
          renderItem={renderProducto}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay productos que coincidan</Text>}
        />
      )}
    </View>
  );
};

export default InformeComponent;
