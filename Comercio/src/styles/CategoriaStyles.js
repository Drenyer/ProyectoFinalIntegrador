import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b35', // Fondo oscuro como en la imagen
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1b35',
  },
  categoriaContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriaImagen: {
    width: '100%',
    height: '100%',
  },
  categoriaInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  categoriaNombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff', // Texto blanco
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  categoriaDescripcion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)', // Texto semi-transparente
    marginBottom: 4,
  },
  categoriaFecha: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)', // Texto más transparente
  },
  separator: {
    height: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6c63ff', // Color púrpura del diseño
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6c63ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    padding: 12,
    backgroundColor: '#6c63ff',
    borderRadius: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
  }
});

export default styles;