import React, { useState, useEffect } from 'react';
import { StatusBar,StyleSheet, View, Text } from 'react-native';
import RockPaperScissors from '../../Components/RPSGame';
import { useFonts } from 'expo-font';
import { getCharacter, getEnemy } from '../../Database/database';

const FightPage = () => {
  const [username, setUsername] = useState('');
  const [enemyLevel, setEnemyLevel] = useState(null);

  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../../assets/font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../../assets/font/Poppins-Light.ttf'),
    'Poppins-Black': require('../../assets/font/Poppins-Light.ttf'),
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
  },[]);

  return (
    <View style={styles.fightBody} className=" pt-20">
      <RockPaperScissors />
    </View>
  );
};

const styles = StyleSheet.create({
  fightBody: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
    height: '100%',
  },
});

export default FightPage;