import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    AsyncStorage.getItem('cartItems')
      .then((cartItems) => {
        let updatedCartItems = [];
        if (cartItems) {
          updatedCartItems = JSON.parse(cartItems);
        }
        const existingItemIndex = updatedCartItems.findIndex((item) => item.id === product.id);

        if (existingItemIndex !== -1) {
          updatedCartItems[existingItemIndex].quantity += product.quantity;
        } else {
          updatedCartItems.push(product);
        }

        AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
          .then(() => {
            console.log('Carrinho atualizado com sucesso');
          })
          .catch((error) => {
            console.error('Erro ao atualizar carrinho:', error);
          });
      })
      .catch((error) => {
        console.error('Erro ao obter carrinho:', error);
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilterByPrice = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (isNaN(min) || isNaN(max)) {
      return;
    }
    const filtered = products.filter((product) => product.price >= min && product.price <= max);
    setFilteredProducts(filtered);
    setShowPriceFilter(false);
  };

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { product: item, addToCart })}>
      <View style={styles.productContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Preço: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cartIconContainer}
        onPress={() => navigation.navigate('Carrinho')}
      >
        <Icon name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.heading}>Produtos</Text>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterIconContainer} onPress={togglePriceFilter}>
          <Icon name="filter" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {showPriceFilter && (
        <View style={styles.priceFilter}>
          <TextInput
            style={styles.priceInput}
            placeholder="Mín"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <Text style={styles.priceSeparator}>-</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="Máx"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterByPrice}>
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  cartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    borderRadius: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  filterIconContainer: {
    padding: 5,
  },
  priceFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 60,
    marginRight: 5,
  },
  priceSeparator: {
    marginHorizontal: 5,
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
