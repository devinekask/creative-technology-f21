import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { GlobalContext } from '../context/GlobalContext';

export const CoffeesListScreen = () => {

  const context = useContext(GlobalContext);
  const { orderItems, setOrderItems } = context;

  const [coffees, setCoffees] = useState([]);
  useEffect(() => {
    const init = async () => {
      const response = await fetch(`${Constants.manifest.extra.apiURL}/coffees`);
      const json = await response.json();
      setCoffees(json);
    };
    init();
  }, []);

  const addToOrder = coffee => {
    console.log(`Add to order: ${coffee.id}`);
    const copiedArray = orderItems.concat();
    const indexInOrderArray = copiedArray.findIndex((check) => check.coffee.id === coffee.id);
    const isAlreadyInArray = (indexInOrderArray > -1);
    if (isAlreadyInArray) {
      copiedArray[indexInOrderArray].amount++;
    } else {
      const newOrder = {
        amount: 1,
        coffee: coffee,
      };
      copiedArray.push(newOrder);
    }
    setOrderItems(copiedArray);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.title}>{item.plantbased ? '🌱 ' : ''}{item.name}</Text>
          <Text style={styles.price}>&euro; {item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          addToOrder(item);
        }}>
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={coffees} renderItem={renderItem} keyExtractor={item => `${item.id}`} />
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
  price: {
    fontSize: 18,
  },
});
