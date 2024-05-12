import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getCharacter } from '../../Database/database';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const character = await getCharacter();
        if (character) {
          setUsername(character.username);
          setGender(character.gender);
        }
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, []);

  return (
    <View style={styles.settingsBody} className=" pt-20">
      <Text style={styles.settingsText}>Settings Page</Text>
      {username && gender && (
        <Text style={styles.settingsText}>
          Welcome, {username} ({gender})!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsBody: {
    padding: 10,
    backgroundColor: '#16191F',
    height: '100%'
  },
  settingsText: {
    color: '#FFFFFF',
  },
});

export default SettingsPage;