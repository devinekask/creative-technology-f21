import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { OrderConfirmationScreen } from './OrderConfirmationScreen';
import { PlaceOrderScreen } from './PlaceOrderScreen';

const Stack = createNativeStackNavigator();

export const OrderScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrderScreen}
          options={{
            title: "Order"
          }}
        />
      <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{
            title: "Order Confirmation"
          }}
        />
    </Stack.Navigator>
  );
};