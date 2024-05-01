import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Avatar from '../assets/Avatars/Male/body.png';
import Arrow from '../assets/arrows.png'

var screenWidth = Dimensions.get('window').width;
var width = screenWidth * .7;

const WorkoutPage = () => {
  return (
    <View style={styles.workoutBody}>
      <Text style={styles.heading}>Pick a body part to work on:</Text>
      <View style={styles.workoutContainer}>
        <Image source={Avatar} style={styles.avatar}/>
        <Image source={Arrow} style={styles.arrow}/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  workoutBody: {
    padding: 10,
    backgroundColor: '#16191F',
  },
  workoutText: {
    color: '#FFFFFF',
  },
  avatar: {
    width: width,
    height: width * 2.48,
  },
  arrow: {
    width: width,
    height: width * 2.48,
    left: '-20%',
  },
  workoutContainer:{
    left: '-20%',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 20,
    padding: 10,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  }
});

export default WorkoutPage;