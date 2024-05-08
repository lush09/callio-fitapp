import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getCharacter, getEnemy } from '../Database/database';
import idleFight from '../assets/FightPage/idle.gif';
import userPunch from '../assets/FightPage/userpunch.gif';
import enemyPunch from '../assets/FightPage/enemypunch.gif';
import versus from '../assets/FightPage/versus.png'
import rockIcon from '../assets/FightPage/rock.png';
import paperIcon from '../assets/FightPage/paper.png';
import scissorIcon from '../assets/FightPage/scissors.png';
import HealthBar from './Healthbar';

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [enemyChoice, setEnemyChoice] = useState(null);
  const [enemyHP, setEnemyHP] = useState(0);
  const [enemyMaxHP, setEnemyMaxHP] = useState(0);
  const [enemyStrength, setEnemyStrength] = useState(0);
  const [playerHP, setPlayerHP] = useState(0);
  const [playerMaxHP, setPlayerMaxHP] = useState(0);
  const [playerStrength, setPlayerStrength] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [fightAnimation, setFightAnimation] = useState(idleFight);

  useEffect(() => {
    const fetchCharacterData = async () => {
      const character = await getCharacter();
      setPlayerHP(character.vitality);
      setPlayerMaxHP(character.vitality);
      setPlayerStrength(character.strength);
    };

    const fetchEnemyData = async () => {
      const enemy = await getEnemy();
      setEnemyHP(enemy.vitality);
      setEnemyMaxHP(enemy.vitality);
      setEnemyStrength(enemy.strength);
    };

    fetchCharacterData();
    fetchEnemyData();
  }, []);

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const enemyOptions = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * enemyOptions.length);
    const enemyChoice = enemyOptions[randomIndex];
    setEnemyChoice(enemyChoice);

    const result = determineWinner(choice, enemyChoice);
    setResult(result);

    if (result === 'player') {
      setEnemyHP(enemyHP - playerStrength);
      setFightAnimation(userPunch);
    } else if (result === 'enemy') {
      setPlayerHP(playerHP - enemyStrength);
      setFightAnimation(enemyPunch);
    }

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setFightAnimation(idleFight);
    }, 2200);
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

  const getChoiceIcon = (choice, isVersus) => {
    if (isVersus) {
      return versus;
    }
  
    switch (choice) {
      case 'rock':
        return rockIcon;
      case 'paper':
        return paperIcon;
      case 'scissors':
        return scissorIcon;
      default:
        return null;
    }
  };

  const getChoiceBackgroundColor = (choice, result) => {
    if (result === 'player' && choice === playerChoice) {
      return 'green';
    } else if (result === 'enemy' && choice === enemyChoice) {
      return 'red';
    } else {
      return '#FEEFAD';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.HPNumber}>
        <Text style={styles.text}>{playerHP}</Text>
        <Text style={styles.text}> {enemyHP}</Text>
      </View>
      <View style={styles.HPBars}>
        <HealthBar percentage={playerHP / playerMaxHP} />
        <HealthBar percentage={enemyHP / enemyMaxHP} fillerColor="red" />
      </View>
      <Image source={fightAnimation} style={styles.fightAnimation} />
      <View style={styles.choicesContainer}>
        <TouchableOpacity
          style={[
            styles.choice,
            { backgroundColor: showResult ? getChoiceBackgroundColor('rock', result) : '#FEEFAD' },
          ]}
          disabled={showResult}
          onPress={() => handlePlayerChoice('rock')}
        >
          <Image source={showResult ? getChoiceIcon(playerChoice) : rockIcon} style={styles.btnImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.choice,
            { backgroundColor: showResult ? getChoiceBackgroundColor('paper', result) : '#FEEFAD' },
          ]}
          disabled={showResult}
          onPress={() => handlePlayerChoice('paper')}
        >
          <Image source={showResult ? versus : paperIcon} style={styles.btnImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.choice,
            { backgroundColor: showResult ? getChoiceBackgroundColor('scissors', result) : '#FEEFAD' },
          ]}
          disabled={showResult}
          onPress={() => handlePlayerChoice('scissors')}
        >
          <Image source={showResult ? getChoiceIcon(enemyChoice) : scissorIcon} style={styles.btnImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#000',
    height: 610,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  HPNumber: {
    flexDirection: 'row',
    gap: 270,
    bottom: 45,
    zIndex: 1,
  },
  HPBars: {
    flexDirection: 'row',
    bottom: 100,
    borderWidth: 7,
    borderColor: '#FFC100',
  },
  fightAnimation: {
    height: 380,
    width: 340,
  },
  choicesContainer: {
    flexDirection: 'row',
  },
  choice: {
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