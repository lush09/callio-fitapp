import { ScrollView,FlatList, StatusBar,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Item from "../../../Database/upperbodydata.json"

const UpperBody = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.main}>
      <Text className=' text-center text-3xl font-pblack text-white'>Upper Body Workouts</Text>
      <View>
      </View>
    </View>
  )
}

export default UpperBody

const styles = StyleSheet.create({
  main: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
    height: '100%'
  }
})