import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      cardName: '',
      expirationDate: '',
      cvv: '',
      isProcessing: false,
    };
  }

  handleInputChange = (inputName, value) => {
    this.setState({ [inputName]: value });
  };

  handleCheckout = () => {
    const { cardNumber, cardName, expirationDate, cvv } = this.state;
    const { cartItems } = this.props.route.params; // Verifica se a propriedade cartItems está sendo passada corretamente

    // Verifica se os campos do cartão estão preenchidos
    if (!cardNumber || !cardName || !expirationDate || !cvv) {
      alert('Preencha todos os campos do cartão!');
      return;
    }

    this.setState({ isProcessing: true });

    setTimeout(() => {
      // Atualiza o estado para indicar que a compra foi finalizada
      this.setState({ isProcessing: false });

      this.props.navigation.navigate('Finalizando...', { cartItems }); // Passa a propriedade cartItems ao navegar para a tela OrderConfirmationScreen
    }, 2000);
  };

  render() {
    const { cardNumber, cardName, expirationDate, cvv, isProcessing } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Finalizar Compra</Text>
        <Text style={styles.label}>Número do Cartão:</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={(value) => this.handleInputChange('cardNumber', value)}
        />
        <Text style={styles.label}>Nome no Cartão:</Text>
        <TextInput
          style={styles.input}
          value={cardName}
          onChangeText={(value) => this.handleInputChange('cardName', value)}
        />
        <Text style={styles.label}>Data de Expiração:</Text>
        <TextInput
          style={styles.input}
          value={expirationDate}
          onChangeText={(value) => this.handleInputChange('expirationDate', value)}
        />
        <Text style={styles.label}>CVV:</Text>
        <TextInput
          style={styles.input}
          value={cvv}
          onChangeText={(value) => this.handleInputChange('cvv', value)}
        />
        <Button
          title={'Finalizar Compra'}
          onPress={this.handleCheckout}
          disabled={isProcessing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});
