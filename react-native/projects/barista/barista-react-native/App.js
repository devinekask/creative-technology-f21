import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CoffeesListScreen } from './components/CoffeesListScreen';
import { PlaceOrderScreen } from './components/PlaceOrderScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalContext } from './context/GlobalContext';
import { OrderScreen } from './components/OrderScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  const [orderItems, setOrderItems] = useState([]);

  return (
    <GlobalContext.Provider value={{
      orderItems,
      setOrderItems
    }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="List" component={CoffeesListScreen} options={{
            title: "Coffees",
            tabBarIcon: ({ color, size }) => (<FontAwesome5 name="coffee" size={size} color={color} />)
          }} />
          <Tab.Screen name="Order" component={OrderScreen} options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<FontAwesome5 name="shopping-cart" size={size} color={color} />)
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}