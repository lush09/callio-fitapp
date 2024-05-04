import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RockPaperScissors from './RPSGame';
import { useFonts } from 'expo-font';
import { getCharacter } from '../Database/database';

const FightPage = () => {
  const [username, setUsername] = useState('');

  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../assets/Font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../assets/Font/Poppins-Light.ttf'),
    'Poppins-Black': require('../assets/Font/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const character = await getCharacter();
        if (character) {
          setUsername(character.username);
        }
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, []);

  return (
    <View style={styles.fightBody}>
      <View style={styles.fightHeader}>
        {username && (
          <Text style={styles.fightText}>
            {username}
          </Text>
        )}
        <Text style={styles.fightText}>LEVEL</Text>
      </View>
      <RockPaperScissors />
    </View>
  );
};

const styles = StyleSheet.create({
  fightBody: {
    padding: 10,
    backgroundColor: '#16191F',
  },
  fightHeader: {
    flexDirection: 'row',
    gap: 170,
  },
  fightText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default FightPage;