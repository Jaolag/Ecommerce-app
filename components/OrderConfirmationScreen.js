import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { cartItems } = route.params;
  const orderId = generateOrderId();
  const viewRef = useRef(null);

  useEffect(() => {
    // Redireciona para a página inicial após 10 segundos
    const timer = setTimeout(() => {
      navigation.navigate('e-commerce');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    try {
      const result = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
      });
      
      
      await Sharing.shareAsync(result);
    } catch (error) {
      console.log('Erro!', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.comprovanteContainer} ref={viewRef}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.heading}>Compra Finalizada</Text>
        </View>
        <View style={styles.comprovanteInfo}>
          <Text style={styles.comprovanteTitle}>Comprovante de Compra:</Text>
          <Text style={styles.orderId}>ID do Pedido: {orderId}</Text>
          <Text style={styles.transactionDate}>Data da Transação: {getCurrentDate()}</Text>
        </View>
        <View style={styles.itemsContainer}>
          <Text style={styles.itemsTitle}>Itens:</Text>
          {cartItems.map((item, index) => (
            <Text key={index} style={styles.item}>
              {item.title} - R$ {item.price}
            </Text>
          ))}
          <Text style={styles.total}>Total: R$ {calculateTotal(cartItems)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.buttonText}>Baixar Comprovante</Text>
      </TouchableOpacity>
    </View>
  );
}

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toISOString().split('T')[0];
}

function calculateTotal(cartItems) {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total.toFixed(2);
}

function generateOrderId() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return String(randomNumber);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comprovanteContainer: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  comprovanteInfo: {
    marginBottom: 20,
  },
  comprovanteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 16,
    marginBottom: 20,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
