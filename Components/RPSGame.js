import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getCharacter } from '../Database/database';
import rockIcon from '../assets/FightPage/rock.png';
import paperIcon from '../assets/FightPage/paper.png';
import scissorIcon from '../assets/FightPage/scissors.png';
import HealthBar from './Healthbar';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [enemyChoice, setEnemyChoice] = useState(null);
  const [playerHP, setPlayerHP] = useState(0);
  const [enemyHP, setEnemyHP] = useState(50);
  const [playerMaxHP, setPlayerMaxHP] = useState(0);
  const [playerStrength, setPlayerStrength] = useState(0);

  useEffect(() => {
    const fetchCharacterData = async () => {
      const character = await getCharacter();
      setPlayerHP(character.vitality);
      setPlayerMaxHP(character.vitality);
      setPlayerStrength(character.strength);
      setPlayerIntelligence(character.intelligence);
    };

    fetchCharacterData();
  }, []);

  const handlePlayerChoice = async (choice) => {
    setPlayerChoice(choice);
    const enemyOptions = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * enemyOptions.length);
    const enemyChoice = enemyOptions[randomIndex];
    setEnemyChoice(enemyChoice);

    const result = determineWinner(choice, enemyChoice);
    if (result === 'player') {
      setEnemyHP(enemyHP - playerStrength);
    } else if (result === 'enemy') {
      setPlayerHP(playerHP - 1);
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
      <View style={styles.HPNumber}>
        <Text style={styles.text}> {enemyHP}</Text>
        <Text style={styles.text}>{playerHP}</Text>
      </View>
      <View style={styles.HPBars}>
        <HealthBar percentage={playerHP / playerMaxHP} />
        <HealthBar percentage={enemyHP / 100} fillerColor="red"/>
      </View>
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
  HPNumber: {
    flexDirection: 'row',
    gap: 260,
    bottom: 353,
    zIndex: 1,
  },
  HPBars:{
    flexDirection: 'row',
    bottom: 400,
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