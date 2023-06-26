import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default class ProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      isAddedToCart: false,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const { product } = route.params;

    axios
      .get(`https://fakestoreapi.com/products/${product.id}`)
      .then((response) => {
        const fullProduct = response.data;
        this.setState({ product: fullProduct });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToCart = () => {
    const { product, quantity } = this.state;
    this.props.route.params.addToCart({ ...product, quantity });

    setTimeout(() => {
      this.props.navigation.goBack();
    }, 2400);

    this.setState({ isAddedToCart: true });
  };

  incrementQuantity = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }));
  };

  decrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
      }));
    }
  };

  render() {
    const { product, quantity, isAddedToCart } = this.state;

    if (!product) {
      return null;
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Detalhes: </Text>

        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />

        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>Preco: ${product.price}</Text>
        <Text style={styles.productDescription}>Description: {product.description}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={this.decrementQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={this.incrementQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
        <Button  title="Adicionar ao Carrinho" onPress={this.addToCart} />
        </View>
        {isAddedToCart && (
          <Text style={styles.addedToCartText}>Adicionado ao Carrinho</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  productDescription: {
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addedToCartText: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
