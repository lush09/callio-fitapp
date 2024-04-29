import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DietPage = () => {
  return (
    <View style={styles.dietContainer}>
      <Text style={styles.dietText}>CALLIO</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  dietContainer: {
    backgroundColor: '#16191F',
    padding: 20,
  },
  dietText: {
    color: '#FFFFFF',
  },
});

export default DietPage;