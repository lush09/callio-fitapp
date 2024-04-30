import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';

const QuizPage = () => {
  const [userInput, setUserInput] = useState(Array(4).fill(''));
  const answer = 'YOGA';
  const [lives, setLives] = useState(3);
  const [hints, setHints] = useState(['']);
  const [gameOver, setGameOver] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../assets/Font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../assets/Font/Poppins-Light.ttf'),
    'Poppins-Black': require('../assets/Font/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const allHints = [
    '',
    'This exercise originated in ancient India.',
    'It involves a lot of stretching and breathing exercises.',
    'It helps improve flexibility and reduce stress.',
  ];

  const handleInputChange = (text, index) => {
    const newInput = [...userInput];
    newInput[index] = text.toUpperCase();
    setUserInput(newInput);
  };

  const handleGuess = () => {
    const joined = userInput.join('');
    if (joined === answer) {
      Alert.alert('Correct!', 'You guessed the answer correctly!');
    } else if (joined.length === answer.length && joined !== answer) {
      if (lives > 1) {
        setLives(lives - 1);
        setHints([...hints, allHints[allHints.length - lives]]);
        setUserInput(Array(4).fill(''));
      } else {
        setGameOver(true);
        Alert.alert('Game Over', `You ran out of lives. The answer was ${answer}.`);
      }
    }
  };

  return (
    <View style={styles.quizBody}>
      <Text style={styles.quizHeader}>
        Word OTD
      </Text>
      <Text style={styles.quizText}>
        A type of exercise that involves a lot of stretching.
      </Text>
      {hints.map((hint, index) => (
        <Text key={index} style={styles.hintText}>
          {hint}
        </Text>
      ))}
      <View style={styles.inputContainer}>
        {userInput.map((value, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            maxLength={1}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            editable={!gameOver}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.guessButton} onPress={handleGuess} disabled={gameOver}>
        <Text style={styles.guessButtonText}>Guess</Text>
      </TouchableOpacity>
      <Text style={styles.livesText}>Lives: {lives}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quizBody: {
    padding: 10,
    backgroundColor: '#16191F',
  },
  quizHeader:{
    color: '#FFF',
    fontFamily: 'Poppins-Black',
    fontSize: 40,
    alignSelf: 'center',
  },
  quizText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Light',
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    width: 40,
  },
  hintText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  guessButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '45%',
  },
  guessButtonText: {
    color: '#16191F',
    fontWeight: 'bold',
  },
  livesText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 35,
  },
});

export default QuizPage;