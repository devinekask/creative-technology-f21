import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const OrderConfirmationScreen = () => {
  return (
    <View style={styles.containerCentered}>
    <Text>Thank you for your order!</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  containerCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
