import { Image,FlatList, StatusBar,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DATA from '../../../Database/armdata.js'
import workout from '../../../assets/App-Icons/workout.png'

const Arm = () => {

  return (
    <View style={styles.main} className=' p-5'>
      <Text className=' text-center text-3xl font-pblack text-white'>Arm Workouts</Text>
      <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View className=' mt-10 p-5 border bg-slate-500 rounded-3xl flex-row items-center'>
            <Image source={workout} className=' w-16 h-16'/>
            <View className=' ml-5 flex-col flex-shrink'>
              <Text className=' text-white text-xl font-pbold text-left'>{item.title}</Text>
              <Text className=' text-white text-lg font-plight text-left'>Training Target:</Text>
              <Text className=' text-white text-lg font-plight text-left'>{item.target}</Text>
              <Text className=' text-green-300 text-lg font-plight text-left'>{item.goal}</Text>
            </View>
          </View>
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