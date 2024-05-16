import React, { useState, useEffect } from 'react';
import { router } from "expo-router";
import { TextInput,Modal,Alert, StatusBar,StyleSheet,Switch, View, Text,Dimensions, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import duck from "../../assets/Avatars/Pfp/duck-profile.png"
import { useFonts } from 'expo-font';
import { getCharacter, resetDatabase, updateCharacterName } from '../../Database/database';

var screenWidth = Dimensions.get('window').width;
var width = screenWidth * .6;

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [gender, setGender] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [isWorkout, setIsWorkout] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [changeNameVisible, setChangeNameVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
  const [str, setStr] = useState(0);
  const [vit, setVit] = useState(0);
  const [int, setInt] = useState(0);


  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const character = await getCharacter();
        if (character) {
          setUsername(character.username);
          setGender(character.gender);
          setVit(character.vitality);
          setStr(character.strength);
          setInt(character.intelligence);
        }
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [newUsername]);

  return (
    <SafeAreaView style={styles.settingsBody}>
      <ScrollView className="px-5">
        <Text className="ml-5 text-white text-3xl font-pblack">CALLIO</Text>
        <View className=" items-center mt-7">
          <Text className=" bg-white py-2 px-24 rounded-full text-lg font-plight">
            Profile
          </Text>
          <Image source={duck} style={styles.avatar} className=' my-5'/>
          <Text className="bg-white py-2 px-24 rounded-full text-lg font-plight">
            {username}
          </Text>
        </View>
        <View className=' mt-5 h-auto'>
          <Text className='text-white text-xl ml-5 font-pblack mb-2'>
            Statistics
          </Text>
          <View className=' bg-white py-2 px-10 rounded-3xl flex mb-5'>
            <View className='flex-row '>
              <Text className=' text-lg w-1/3 text-center font-pbold'>
                VIT
              </Text>
              <Text className=' text-lg w-1/3 text-center font-pbold'>
                STR
              </Text>
              <Text className=' text-lg w-1/3 text-center font-pbold'>
                INT
              </Text>
            </View>
            <View className='flex-row '>
              <Text className=' text-lg w-1/3 text-green-500 text-center font-plight'>
                {vit}
              </Text>
              <Text className=' text-lg w-1/3 text-red-500 text-center font-plight'>
                {str}
              </Text>
              <Text className=' text-lg w-1/3 text-blue-500 text-center font-plight'>
                {int}
              </Text>
            </View>
          </View>
        </View>
        <View className=' mt-5 h-auto'>
          <Text className='text-white text-xl ml-5 font-pblack mb-2'>
            Account
          </Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={changeNameVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setChangeNameVisible(!changeNameVisible);
            }}
            className=' absolute'
            >
              <View className = ' h-screen w-screen absolute bg-black opacity-50'></View>
              <View className=' bg-slate-600 m-5 top-1/3 rounded-3xl border-4 border-orange-300'>
                <View className='m-3'>
                  <View 
                    className=' border-b text-lg font-plight pt-5 mx-2 border-white rounded-lg'>
                    <TextInput
                    placeholder="Username"
                    placeholderTextColor={"#808080"}
                    color={"#fff"}
                    value={newUsername}
                    onChangeText={setNewUsername}
                    className='text-lg font-plight mx-3'
                    />
                  </View>
                  <View className=' flex-row gap-10 justify-end pt-5'>
                    <Pressable
                      onPress = { async () => {
                        setChangeNameVisible(!changeNameVisible)
                        await updateCharacterName(newUsername)
                        setUsername(newUsername)
                        setNewUsername('')
                      }}>
                      <Text className=' text-lg font-pbold text-green-400'>Confirm</Text>
                    </Pressable>
                    <Pressable
                      onPress = { async () => {
                        setChangeNameVisible(!changeNameVisible)
                        setNewUsername('')
                      }}>
                      <Text className=' text-lg font-pbold text-red-400'>Cancel</Text>
                    </Pressable>
                  </View>
                  
                </View>
              </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={deleteAccountVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setDeleteAccountVisible(!deleteAccountVisible);
            }}
            className=' absolute'
            >
              <View className = ' h-screen w-screen absolute bg-black opacity-50'></View>
              <View className=' bg-slate-600 m-5 top-1/3 rounded-3xl border-4 border-orange-300'>
                <View className='m-3'>
                  <View className=' mt-3'>
                    <Text className=' text-white text-lg font-plight'>Are you sure you want to delete your account? This action is irreversible.</Text>
                  </View>
                  <View className=' flex-row gap-10 justify-end pt-5'>
                    <Pressable
                      onPress = { async () => {
                        setDeleteAccountVisible(!deleteAccountVisible)
                        await resetDatabase()
                        router.replace('/')
                      }}>
                      <Text className=' text-lg font-pbold text-red-400'>Delete</Text>
                    </Pressable>
                    <Pressable
                      onPress = { async () => {
                        setDeleteAccountVisible(!deleteAccountVisible)
                      }}>
                      <Text className=' text-lg font-pbold text-gray-400'>Cancel</Text>
                    </Pressable>
                  </View>
                  
                </View>
              </View>
          </Modal>
          <View className=' bg-white py-2 px-10 rounded-3xl'>
            <Pressable 
              onPress={() => setChangeNameVisible(!changeNameVisible)}>
                <Text className=' text-lg font-plight py-2 border-double border-gray-300 border-b'>Change Username</Text>
            </Pressable>
            <Pressable 
              onPress={() => setDeleteAccountVisible(!deleteAccountVisible)}>
                <Text className=' text-lg font-plight py-2'>Delete Account</Text>
            </Pressable>
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
                Reminder
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