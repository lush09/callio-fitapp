import { Modal,Image,FlatList, StatusBar,StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import DATA from '../../../Database/armdata.js'
import workout from '../../../assets/App-Icons/workout.png'

const Arm = () => {
  const [clickedItemVisible, setClickedItemVisible] = useState('');
  return (
    <View style={styles.main} className=' p-5'>
      <Text className=' text-center text-3xl font-pblack text-white'>Arm Workouts</Text>
      <View>
        <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setClickedItemVisible(item.id)}>
                <View className=' mt-10 p-5 border bg-slate-500 rounded-3xl flex-row items-center'>
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
                      Alert.alert('Modal has been closed.');
                      setClickedItemVisible('');
                    }}
                    className=' absolute'
                    >
                      <View className=' h-full bg-slate-600 border-t-4 border-x-4 border-white'>
                        <View className='m-3'>
                          <View className=' mt-3'>
                            <Text className=' text-white text-xl font-pbold text-left'>{item.title}</Text>
                            <Text className=' text-white text-lg font-plight text-left'>Training Target:</Text>
                            <Text className=' text-white text-lg font-plight text-left'>{item.target}</Text>
                            <Text className=' text-green-300 text-lg font-plight text-left'>{item.goal}</Text>
                          </View>
                          <View className=' flex-row gap-10 justify-end pt-5'>
                            <Pressable
                              onPress = { async () => {
                                setClickedItemVisible('')
                              }}>
                              <Text className=' text-lg font-pbold text-gray-400'>Cancel</Text>
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