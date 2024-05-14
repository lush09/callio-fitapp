import React, { useState } from 'react';
import { StyleSheet, Switch, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { createCharacter } from '../Database/database';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import maleAvatar from '../assets/Avatars/Male/male-1.png';
import femaleAvatar from '../assets/Avatars/Female/female-1.png';

const CharCreate = ({ onCharacterCreated }) => {
  const [username, setUsername] = useState('');
  const [isMale, setIsMale] = useState(true);
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../assets/font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../assets/font/Poppins-Bold.ttf'),
    'Poppins-Black': require('../assets/font/Poppins-Black.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleCreateCharacter = async () => {
    try {
      await createCharacter(username, isMale);
      onCharacterCreated();
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  const isButtonDisabled = username.trim() === '';

  return (
    <View style={styles.CCContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CALLIO</Text>
      </View>
      <Text style={styles.CCText}> CREATE YOUR </Text>
      <Text style={styles.CCTextBold}> CHARACTER! </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"#808080"}
        color={"#fff"}
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderText}>{isMale ? 'Male' : 'Female'}</Text>
        <Switch
          trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
          thumbColor={isMale ? '#fff' : '#fff'}
          onValueChange={() => setIsMale(!isMale)}
          value={isMale}
        />
      </View>
      <Image source={isMale ? maleAvatar : femaleAvatar} style={styles.avatar} />
      <TouchableOpacity
        style={[styles.CCButton, isButtonDisabled && styles.disabledButton]}
        onPress={handleCreateCharacter}
        disabled={isButtonDisabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, isButtonDisabled && styles.disabledButtonText]}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CCContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    letterSpacing: 2,
    fontFamily: 'Poppins-Black',
  },
  CCText: {
    fontSize: 24,
    fontFamily: 'Poppins-Light',
    color: '#fff',
    padding: 15,
    paddingBottom: 0,
    letterSpacing: 1,
  },
  CCTextBold: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    paddingLeft: 15,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    width: '90%',
    marginBottom: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  genderText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  avatar: {
    width: 130,
    height: 390,
    alignSelf: 'center',
    marginBottom: 20,
  },
  CCButton: {
    width: '80%',
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#808080',
  },
  disabledButtonText: {
    color: '#bbb',
  },
});

export default CharCreate;