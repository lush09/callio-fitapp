import React from 'react';
import { View, StyleSheet } from 'react-native';

const HealthBar = ({ percentage, fillerColor = 'green' }) => {
  const fillerWidth = `${percentage * 100}%`;

  return (
    <View style={styles.container}>
      <View style={[styles.filler, { width: fillerWidth, backgroundColor: fillerColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: '50%',
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  filler: {
    height: '100%',
  },
});

export default HealthBar;