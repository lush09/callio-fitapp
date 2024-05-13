import React, { useState, useEffect } from 'react';
import { StatusBar,StyleSheet,Switch, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { getCharacter } from '../../Database/database';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [isWorkout, setIsWorkout] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

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
    <SafeAreaView style={styles.settingsBody}>
      <ScrollView className="px-5">
        <Text className="ml-5 text-white text-2xl font-extrabold">CALLIO</Text>
        <View className=" items-center mt-7">
          <Text className=" bg-white py-2 px-24 rounded-full text-lg">
            Profile Settings
          </Text>
          <Text className=" h-56">
            icon here
          </Text>
          <Text className="bg-white py-2 px-24 rounded-full text-lg">
            Name
          </Text>
        </View>
        <View className='mt-10'>
          <Text className='text-white text-2xl ml-5'>
            Account
          </Text>
          <View className=' bg-white py-2 px-10 rounded-3xl'>
            <Text className=' text-lg'>
              Change username
            </Text>
            <Text className=' text-lg'>
              Change password
            </Text>
            <Text className=' text-lg'>
              Edit profile
            </Text>
            <Text className=' text-lg'>
              Delete account
            </Text>
          </View>
        </View>
        <View className='mt-10'>
          <Text className='text-white text-2xl ml-5'>
            Notification
          </Text>
          <View className=' bg-white py-5 px-10 rounded-3xl flex-row flex-wrap'>
            <Text className=' text-lg w-2/3'>
              New for you
            </Text>
            <Switch
              trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
              onValueChange={() => setIsNew(!isNew)}
              value={isNew}
            />
            <Text className=' text-lg w-2/3'>
              Workout Activity
            </Text>
            <Switch
              trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
              onValueChange={() => setIsNew(!isNew)}
              value={isNew}
            />
            <Text className=' text-lg w-2/3'>
              Email Notification
            </Text>
            <Switch
              trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
              onValueChange={() => setIsNew(!isNew)}
              value={isNew}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
  settingsBody: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
    height: '100%'
  },
  settingsText: {
    color: '#FFFFFF',
  },
});

export default SettingsPage;