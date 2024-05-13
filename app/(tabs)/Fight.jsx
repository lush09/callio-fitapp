import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RockPaperScissors from '../../Components/RPSGame';
import { useFonts } from 'expo-font';
import { getCharacter, getEnemy } from '../../Database/database';

const FightPage = () => {
  const [username, setUsername] = useState('');
  const [enemyLevel, setEnemyLevel] = useState(null);

  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../../assets/Font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../../assets/Font/Poppins-Light.ttf'),
    'Poppins-Black': require('../../assets/Font/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const character = await getCharacter();
        if (character) {
          setUsername(character.username);
        }
  
        const enemy = await getEnemy();
        if (enemy) {
          setEnemyLevel(enemy.level);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <View style={styles.fightBody} className=" pt-20">
      <View style={styles.fightHeader}>
        {username && (
          <Text style={styles.fightText}>
            {username}
          </Text>
        )}
        <Text style={styles.fightText}>
          LEVEL {enemyLevel !== null ? enemyLevel : ''}
        </Text>
      </View>
      <RockPaperScissors />
    </View>
  );
};

const styles = StyleSheet.create({
  fightBody: {
    padding: 10,
    backgroundColor: '#16191F',
    height: '100%',
  },
  fightHeader: {
    flexDirection: 'row',
    gap: 180,
  },
  fightText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Light',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default FightPage;