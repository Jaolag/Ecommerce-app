import React from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      total: 0,
    };
  }

  componentDidMount() {
    this.loadCartItems();
  }

  loadCartItems = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      if (cartItems) {
        const parsedCartItems = JSON.parse(cartItems);
        this.setState({ cartItems: parsedCartItems }, this.calculateTotal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  saveCartItems = async (cartItems) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error(error);
    }
  };

  calculateTotal = () => {
    const { cartItems } = this.state;
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    this.setState({ total });
  };

  updateCartItems = () => {
    const { cartItems } = this.props.route.params;
    this.setState({ cartItems }, () => {
      this.saveCartItems(cartItems);
      this.calculateTotal();
    });
  };

  handlePayment = () => {
    const { cartItems } = this.state;
    this.clearCartItems();
    this.props.navigation.navigate('Endereco', { cartItems: cartItems });
  };
  
  

  removeFromCart = (index) => {
    this.setState(
      (prevState) => {
        const updatedCartItems = [...prevState.cartItems];
        updatedCartItems.splice(index, 1);
        this.saveCartItems(updatedCartItems);
        return { cartItems: updatedCartItems };
      },
      () => {
        this.saveCartItems(this.state.cartItems);
        this.calculateTotal();
      }
    );
  };

  clearCartItems = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      this.setState({ cartItems: [], total: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { cartItems, total } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Carrinho de compras</Text>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>Preco: ${item.price}</Text>
                <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
              </View>
              <Button title="Remover" onPress={() => this.removeFromCart(index)} />
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>O carrinho está vazio.</Text>
        )}

        <Text style={styles.totalText}>Total: ${total}</Text>
        <Button title="Prosseguir" onPress={this.handlePayment} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyCartText: {
    fontSize: 18,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
