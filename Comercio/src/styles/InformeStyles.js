import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1b35', // Fondo sólido de color morado oscuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  botonFiltrar: {
    backgroundColor: '#6A0DAD', // Color morado oscuro
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonDescargar: {
    backgroundColor: '#4B0082', // Morado intenso para el botón de descargar PDF
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  productoContainer: {
    backgroundColor: '#3E206D', // Fondo más oscuro para los productos
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
