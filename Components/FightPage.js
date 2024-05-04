import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RockPaperScissors from './RPSGame';

const FightPage = () => {
  return (
    <View style={styles.fightBody}>
      <Text style={styles.fightText}>Combat Page</Text>
      <RockPaperScissors />
    </View>
  );
};

const styles = StyleSheet.create({
  fightBody: {
    padding: 10,
    backgroundColor: '#16191F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fightText: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default FightPage;