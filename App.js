import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import WorkoutPage from './Components/WorkoutPage.js';
import DietPage from './Components/DietPage.js';
import QuizPage from './Components/QuizPage.js';
import FightPage from './Components/FightPage.js';
import SettingsPage from './Components/SettingsPage.js';
import CharCreate from './CharCreate.js';
import { initializeDatabase, getCharacter } from './Database/database.js';
import WorkoutIcon from './assets/App-Icons/workout.png';
import DietIcon from './assets/App-Icons/diet.png';
import QuizIcon from './assets/App-Icons/quiz.png';
import FightIcon from './assets/App-Icons/fight.png';
import ProfileIcon from './assets/App-Icons/profile.png';
import { useFonts } from 'expo-font';

export default function App() {
  const [activePage, setActivePage] = useState('Workouts');
  const [characterCreated, setCharacterCreated] = useState(false);

  useEffect(() => {
    initializeDatabase();
  
    const checkCharacter = async () => {
      try {
        const character = await getCharacter();
        if (character) {
          setCharacterCreated(true);
        }
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };
  
    checkCharacter();
  }, []);
 
  const handleCharacterCreated = () => {
    setCharacterCreated(true);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Workouts':
        return <WorkoutPage />;
      case 'Stats':
        return <DietPage />;
      case 'Quiz':
        return <QuizPage />;
      case 'Fight':
        return <FightPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <WorkoutPage />;
    }
  };

  return (
    <View style={styles.container}>
      {characterCreated ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>CALLIO</Text>
          </View>
          <View style={styles.pageContainer}>{renderPage()}</View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setActivePage('Workouts')}>
              <Image source={WorkoutIcon} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('Stats')}>
              <Image source={DietIcon} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('Quiz')}>
              <Image source={QuizIcon} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('Fight')}>
              <Image source={FightIcon} style={styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('Settings')}>
              <Image source={ProfileIcon} style={styles.footerIcon} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <CharCreate onCharacterCreated={handleCharacterCreated} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16191F',
  },
  header: {
    backgroundColor: '#16191F',
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    paddingVertical: 10,
    backgroundColor: '#080911',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIcon: {
    width: 28, 
    height: 28, 
    tintColor: '#FFFFFF', 
  },
});