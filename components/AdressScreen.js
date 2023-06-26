import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function AddressScreen({ navigation, route }) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSaveAddress = () => {
    const { cartItems } = route.params;

    // Validação dos campos de endereço
    if (!address || !city || !postalCode) {
      alert('Preencha todos os campos de endereço!');
      return;
    }

    // Salva o endereço no banco de dados ou em algum estado global, se necessário

    // Redireciona para a próxima tela (por exemplo, tela de revisão do pedido)
    navigation.navigate('Metodo Pagamento', { cartItems });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Endereço de Entrega</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Digite o endereço completo"
        />
        <Text style={styles.label}>Cidade:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Digite a cidade"
        />
        <Text style={styles.label}>CEP:</Text>
        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={setPostalCode}
          placeholder="Digite o CEP"
        />
        <Button title="Salvar Endereço" onPress={handleSaveAddress} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
