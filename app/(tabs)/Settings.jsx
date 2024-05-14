import React, { useState, useEffect } from 'react';
import { StatusBar,StyleSheet,Switch, View, Text,Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import duck from "../../assets/Avatars/Pfp/duck-profile.png"
import { useFonts } from 'expo-font';
import { getCharacter } from '../../Database/database';

var screenWidth = Dimensions.get('window').width;
var width = screenWidth * .6;

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
        <Text className="ml-5 text-white text-3xl font-pblack">CALLIO</Text>
        <View className=" items-center mt-7">
          <Text className=" bg-white py-2 px-24 rounded-full text-lg font-plight">
            Profile Settings
          </Text>
          <Image source={duck} style={styles.avatar} className=' my-5'/>
          <Text className="bg-white py-2 px-24 rounded-full text-lg font-plight">
            {username}
          </Text>
        </View>
        <View className=' mt-5 h-auto'>
          <Text className='text-white text-xl ml-5 font-pblack mb-2'>
            Account
          </Text>
          <View className=' bg-white py-2 px-10 rounded-3xl'>
            <Text className=' text-lg font-plight py-2 border-double border-gray-300 border-b'>
              Change username
            </Text>
            <Text className=' text-lg font-plight py-2 border-double border-gray-300 border-b'>
              Edit profile
            </Text>
            <Text className=' text-lg font-plight py-2'>
              Delete account
            </Text>
          </View>
        </View>
        <View className='mt-5 '>
          <Text className='text-white text-xl ml-5 font-pblack mb-2'>
            Notification
          </Text>
          <View className=' bg-white py-5 px-10 rounded-3xl flex flex-row mb-5'>
            <View className='w-5/6 '>
              <Text className=' text-lg w-2/3 font-plight my-[10]'>
                New for you
              </Text>
              <Text className=' text-lg w-2/3 font-plight my-[10]'>
                Workout Activity
              </Text>
              <Text className=' text-lg w-2/3 font-plight my-[10]'>
                Email Notification
              </Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
                onValueChange={() => setIsNew(!isNew)}
                value={isNew}
              />
              <Switch
                trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
                onValueChange={() => setIsWorkout(!isWorkout)}
                value={isWorkout}
              />
              <Switch
                trackColor={{ false: '#FF76CE', true: '#A3D8FF' }}
                onValueChange={() => setIsEmail(!isEmail)}
                value={isEmail}
              />
            </View>
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
  },
  settingsText: {
    color: '#FFFFFF',
  },
  avatar: {
    width: width,
    height: width
  }
});

export default SettingsPage;