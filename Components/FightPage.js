import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const FightPage = () => {
  return (
    <View style={styles.fightBody}>
      <Text style={styles.fightText}>Combat Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fightBody: {
    padding: 10,
    backgroundColor: '#16191F',
  },
  fightText: {
    color: '#FFFFFF',
  },
});

export default FightPage;