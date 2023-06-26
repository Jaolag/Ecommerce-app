import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PaymentMethodScreen({ navigation, route }) {
  const { cartItems } = route.params;

  const handlePaymentMethodSelection = (method) => {
    console.log('Método de pagamento selecionado:', method);
    navigation.navigate('Finalizar Compra', { cartItems });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Selecionar Método de Pagamento</Text>
      
      <Button
        title="Cartão de Crédito"
        onPress={() => handlePaymentMethodSelection('Cartão de Crédito')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
