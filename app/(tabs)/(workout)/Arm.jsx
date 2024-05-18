import { Modal,Image,FlatList, StatusBar,StyleSheet, Text, View, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import DATA from '../../../Database/armdata.js'
import workout from '../../../assets/App-Icons/workout.png'
import YoutubePlayer from 'react-native-youtube-iframe'
import { getCharacter, updateStrength } from '../../../Database/database.js'

const Arm = () => {
  const [clickedItemVisible, setClickedItemVisible] = useState('');
  const [playing, setPlaying] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    fetchCharacterData()
  }, []);

  const fetchCharacterData = async () => {
    try {
      const character = await getCharacter();
      if (character) {
        setStrength(character.strength);
      }
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  const onStateChange = useCallback(state => {
    if(state === 'ended') {
      setPlaying(false);
    }
  },[])
  return (
    <View style={styles.main} className=' p-5'>
      <Text className=' text-center text-3xl font-pblack text-white'>Arm Workouts</Text>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setClickedItemVisible(item.id)}>
              <View className=' mt-5 p-5 border bg-slate-500 rounded-3xl flex-row items-center'>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={clickedItemVisible === item.id}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setClickedItemVisible('');
                  }}
                  className=' absolute'
                  >
                    <View className = ' h-screen w-screen absolute bg-black opacity-50'></View>
                </Modal>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={clickedItemVisible === item.id}
                  onRequestClose={() => {
                    setClickedItemVisible('');
                  }}
                  className=' absolute'
                  >
                    <View className=' h-full bg-slate-600 border-t-4 border-x-4 border-white'>
                      <View className='m-3 mt-5'>
                        <View className='mb-2 flex-row justify-between'>
                          <Text className=' text-white text-lg font-pbold text-left'>Video Example</Text>
                          <Pressable
                            onPress = { async () => {
                              setClickedItemVisible('')
                            }}>
                            <Text className=' text-2xl font-pbold text-gray-400'>X</Text>
                          </Pressable>
                        </View>
                        <YoutubePlayer 
                          height={300}
                          play={playing}
                          videoId={item.videoId}
                          onChangeState={onStateChange}
                          />
                        <View>
                          <Text className=' text-white text-xl font-pbold text-center'>{item.title}</Text>
                          <Text className=' text-white text-lg font-plight text-center'>Training Target:</Text>
                          <Text className=' text-white text-lg font-plight text-center'>{item.target}</Text>
                          <Text className=' text-green-300 text-lg font-plight text-center'>{item.goal}</Text>
                        </View>
                        <View className='w-full items-center mt-5'>
                          <Pressable
                            className=' w-1/2 p-2 bg-white rounded-lg'
                            onPress = { async () => {
                              const updatedStrength = strength + 2;
                              await updateStrength(updatedStrength);
                              setStrength(updatedStrength)
                              Alert.alert(
                                'Congratulations',
                                `You now have ${updatedStrength} strength!.`,
                                [
                                  {
                                    text: 'Cancel',
                                    style: 'cancel',
                                  }
                                ],
                                { cancelable: false }
                              );
                            }}>
                            <Text className=' text-xl font-plight text-black text-center'>Workout Finished</Text>
                          </Pressable>
                        </View>
                        
                      </View>
                    </View>
                </Modal>
                
                <Image source={workout} className=' w-16 h-16'/>
                <View className=' ml-5 flex-col flex-shrink'>
                  <Text className=' text-white text-xl font-pbold text-left'>{item.title}</Text>
                  <Text className=' text-white text-lg font-plight text-left'>Training Target:</Text>
                  <Text className=' text-white text-lg font-plight text-left'>{item.target}</Text>
                  <Text className=' text-green-300 text-lg font-plight text-left'>{item.goal}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

export default Arm

const styles = StyleSheet.create({
  main: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
    height: '100%'
  }
})