import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import WorkoutPage from './(tabs)/Workout.jsx';
import DietPage from './(tabs)/Diet.jsx';
import QuizPage from './(tabs)/Quiz.jsx';
import FightPage from './(tabs)/Fight.jsx';
import SettingsPage from './(tabs)/Settings.jsx';
import CharCreate from './CharCreate.js';
import { initializeDatabase, getCharacter } from '../Database/database.js';
import WorkoutIcon from '../assets/App-Icons/workout.png';
import DietIcon from '../assets/App-Icons/diet.png';
import QuizIcon from '../assets/App-Icons/quiz.png';
import FightIcon from '../assets/App-Icons/fight.png';
import ProfileIcon from '../assets/App-Icons/profile.png';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

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
    <SafeAreaView style={styles.container}>
      {characterCreated ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>CALLIO</Text>
          </View>
          <View style={styles.pageContainer}>{renderPage()}</View>
          <View style={styles.footer}>
            <Link href="/WorkoutPage" style={styles.footerIcon}><Image source={WorkoutIcon} style={styles.footerImg}/></Link>
            <Link href="/DietPage" style={styles.footerIcon}><Image source={DietIcon} style={styles.footerImg}/></Link>
            <Link href="/QuizPage" style={styles.footerIcon}><Image source={QuizIcon} style={styles.footerImg}/></Link>
            <Link href="/FightPage" style={styles.footerIcon}><Image source={FightIcon} style={styles.footerImg}/></Link>
            <Link href="/SettingsPage" style={styles.footerIcon}><Image source={ProfileIcon} style={styles.footerImg}/></Link>
          </View>
        </>
      ) : (
        <CharCreate onCharacterCreated={handleCharacterCreated} />
      )}
    </SafeAreaView>
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
    height: 48
  },
  footerImg: {
    width: 28, 
    height: 28, 
    tintColor: '#FFFFFF', 
  },
});