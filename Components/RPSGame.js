import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { getCharacter, getEnemy, updateCombatEnemy } from '../Database/database';
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
  const [enemyIntelligence, setEnemyIntelligence] = useState(0);
  const [playerHP, setPlayerHP] = useState(0);
  const [playerMaxHP, setPlayerMaxHP] = useState(0);
  const [playerStrength, setPlayerStrength] = useState(0);
  const [playerIntelligence, setPlayerIntelligence] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [fightAnimation, setFightAnimation] = useState(idleFight);
  const [enemyLevel, setEnemyLevel] = useState(0);

  useEffect(() => {
    const fetchCharacterData = async () => {
      const character = await getCharacter();
      setPlayerHP(character.vitality);
      setPlayerMaxHP(character.vitality);
      setPlayerStrength(character.strength);
      setPlayerIntelligence(character.intelligence);
    };

    const fetchEnemyData = async () => {
      const enemy = await getEnemy();
      setEnemyHP(enemy.level * 5);
      setEnemyMaxHP(enemy.level * 5);
      setEnemyStrength(enemy.level + 1);
      setEnemyIntelligence(enemy.level);
      setEnemyLevel(enemy.level);
    };

    fetchCharacterData();
    fetchEnemyData();
  }, []);

  const handlePlayerChoice = async (choice) => {
    setPlayerChoice(choice);
    const enemyOptions = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * enemyOptions.length);
    const enemyChoice = enemyOptions[randomIndex];
    setEnemyChoice(enemyChoice);

    const result = determineWinner(choice, enemyChoice);
    setResult(result);

    if (result === 'player') {
      const playerDamage = calculateDamage(playerStrength, enemyIntelligence, true);
      const newEnemyHP = enemyHP - playerDamage;
      setEnemyHP(newEnemyHP);
      setFightAnimation(userPunch);

      if (newEnemyHP <= 0) {
        Alert.alert(
          'Congratulations',
          'Proceed to the next level?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                const newLevel = enemyLevel + 1;
                setEnemyLevel(newLevel);
                await updateEnemyStats(newLevel);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } else if (result === 'enemy') {
      const enemyDamage = calculateDamage(enemyStrength, enemyIntelligence, false);
      const newPlayerHP = playerHP - enemyDamage;
      setPlayerHP(newPlayerHP);
      setFightAnimation(enemyPunch);

      if (newPlayerHP <= 0) {
        // Player defeated
        alert('Grow stronger and try again!');
        setPlayerHP(playerMaxHP); // Reset player HP to max
        setEnemyHP(enemyMaxHP); // Reset enemy HP to max
      }
    }

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setFightAnimation(idleFight);
    }, 2200);
  };

  const calculateDamage = (strength, intelligence, isPlayer) => {
    const critChance = 0.2; // 20% critical chance
    let damage = strength;

    if (Math.random() <= critChance) {
      if (isPlayer) {
        damage += playerIntelligence;
      } else {
        damage += intelligence;
      }
    }

    return damage;
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

  const updateEnemyStats = async (level) => {
    try {
      await updateCombatEnemy(level);
    } catch (error) {
      console.error('Error updating enemy stats:', error);
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
