
import React, { useState, useEffect } from 'react';
import { StatusBar,StyleSheet, Image, Text, View, TouchableOpacity,SafeAreaView } from 'react-native';
import CharCreate from './CharCreate.js';
import { initializeDatabase, getCharacter } from '../Database/database.js';
import { Link } from 'expo-router';
import Logo from '../assets/logo.png'

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

  return (
    <SafeAreaView style={styles.container}>
      {characterCreated ? (
          <View style={styles.main} className=' p-5 items-center justify-center'>
            <View>
              <Text className='text-white font-plight text-2xl'>Let's</Text>
              <Text className='text-white font-pblack text-3xl'>Play & Improve!</Text>
            </View>
              <Image source={Logo} style={styles.logo} className=' h-72 w-80'/>
              <Link href="/Workout"><Text className='text-4xl font-pblack text-white'> Click Here to Start!</Text></Link>
          </View>
      ) : (
        <CharCreate onCharacterCreated={handleCharacterCreated} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
   },
  container: {
    flex: 1,
  },
});