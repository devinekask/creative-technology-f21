import React, { useContext, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';

import { GlobalContext } from '../context/GlobalContext';

export const PlaceOrderScreen = ({ navigation }) => {

  const context = useContext(GlobalContext);
  const { orderItems, setOrderItems } = context;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);

  const calculateTotal = () =>
    orderItems.reduce((total, orderItem) => {
      return total + orderItem.coffee.price * orderItem.amount;
    }, 0);


  const placeOrder = async () => {
    setIsOrdering(true);
    const orderData = { name: firstName, last_name: lastName, orderItems };

    const resp = await fetch(`${Constants.manifest.extra.apiURL}/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.ok) {
      navigation.navigate('OrderConfirmation');
      setOrderItems([]);
      setIsOrdering(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.coffee.name}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
    );
  };

  return (isOrdering ? 
    <View style={{...styles.container, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.title}>Placing Order...</Text>
    </View>
    : 
    <View style={styles.container}>
      <FlatList data={orderItems} renderItem={renderItem} keyExtractor={item => `${item.coffee.id}`} />

      <View style={styles.totalContainer}>
        <Text style={styles.title}>Total:</Text>
        <Text style={styles.amount}>&euro; {calculateTotal().toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TextInput style={styles.textInput} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
        <TextInput style={styles.textInput} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <Button title="Place Order" onPress={() => placeOrder()} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  title: {
    fontSize: 24,
  },
  amount: {
    fontSize: 18,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20
  },
  buttonContainer: {
    padding: 20
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 16,
    marginBottom: 20
  }
});
