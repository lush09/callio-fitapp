import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getCharacter } from '../Database/database';
import rockIcon from '../assets/FightPage/rock.png';
import paperIcon from '../assets/FightPage/paper.png';
import scissorIcon from '../assets/FightPage/scissors.png';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [enemyChoice, setEnemyChoice] = useState(null);
  const [playerHP, setPlayerHP] = useState(0);
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerStrength, setPlayerStrength] = useState(0);

  useEffect(() => {
    const fetchCharacterData = async () => {
      const character = await getCharacter();
      setPlayerHP(character.vitality);
      setPlayerStrength(character.strength);
    };

    fetchCharacterData();
  }, []);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const enemyOptions = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * enemyOptions.length);
    const enemyChoice = enemyOptions[randomIndex];
    setEnemyChoice(enemyChoice);

    const result = determineWinner(choice, enemyChoice);
    if (result === 'player') {
      setEnemyHP(enemyHP - playerStrength);
    } else if (result === 'enemy') {
      setPlayerHP(playerHP - 10);
    }
  };

  const determineWinner = (player, enemy) => {
    if (player === enemy) {
      return 'draw';
    } else if (
      (player === 'rock' && enemy === 'scissors') ||
      (player === 'paper' && enemy === 'rock') ||
      (player === 'scissors' && enemy === 'paper')
    ) {
      return 'player';
    } else {
      return 'enemy';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Player HP: {playerHP}</Text>
      <Text style={styles.text}>Enemy HP: {enemyHP}</Text>
      <Text style={styles.text}>
        Player chose: {playerChoice ? playerChoice : 'None'}
      </Text>
      <Text style={styles.text}>
        Enemy chose: {enemyChoice ? enemyChoice : 'None'}
      </Text>
      <View style={styles.choicesContainer}>
        <TouchableOpacity
          style={styles.choice}
          onPress={() => handlePlayerChoice('rock')}
        >
          <Image source={rockIcon} style={styles.btnImage}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choice}
          onPress={() => handlePlayerChoice('paper')}
        >
          <Image source={paperIcon} style={styles.btnImage}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choice}
          onPress={() => handlePlayerChoice('scissors')}
        >
          <Image source={scissorIcon} style={styles.btnImage}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#16191F',
    height: 610,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  choicesContainer: {
    flexDirection: 'row',
  },
  choice: {
    backgroundColor: '#FEEFAD',
    padding: 20,
    width: 120,
    borderWidth: 7,
    borderColor: '#FFC100',
  },
  btnImage: {
    width: 35,
    height: 50,
    alignSelf: 'center',
  }
});

export default RockPaperScissors;