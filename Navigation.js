import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
import PaymentMethodScreen from './components/PaymentMethodScreen';
import CheckoutScreen from './components/CheckoutScreen';
import OrderConfirmationScreen from './components/OrderConfirmationScreen';
import AddressScreen from './components/AdressScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="e-commerce" component={HomeScreen} />
        <Stack.Screen name="Detalhes" component={ProductScreen} />
        <Stack.Screen name="Carrinho" component={CartScreen} />
        <Stack.Screen name="Endereco" component={AddressScreen} />
        <Stack.Screen name="Metodo Pagamento" component={PaymentMethodScreen} />
        <Stack.Screen name="Finalizar Compra" component={CheckoutScreen} />
        <Stack.Screen name="Finalizando..." component={OrderConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
