import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getCharacter } from '../Database/database';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [vitality, setVitality] = useState(0);
  const [strength, setStrength] = useState(0);
  const [intelligence, setIntelligence] = useState(0);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const character = await getCharacter();
        if (character) {
          setUsername(character.username);
          setGender(character.gender);
          setVitality(character.vitality);
          setStrength(character.strength);
          setIntelligence(character.intelligence);
        }
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, []);

  return (
    <View style={styles.settingsBody}>
      <Text style={styles.settingsText}>Settings Page</Text>
      {username && gender && (
        <View>
          <Text style={styles.settingsText}>
            Welcome, {username} ({gender})!
          </Text>
          <Text style={styles.settingsText}>Vitality: {vitality}</Text>
          <Text style={styles.settingsText}>Strength: {strength}</Text>
          <Text style={styles.settingsText}>Intelligence: {intelligence}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsBody: {
    padding: 10,
    backgroundColor: '#16191F',
  },
  settingsText: {
    color: '#FFFFFF',
  },
});

export default SettingsPage;