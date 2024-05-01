import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions,TouchableOpacity } from 'react-native';
import Avatar from '../assets/Avatars/Male/body.png';
import Arrow from '../assets/arrows.png';
import Arm from '../assets/Buttons/arm.png';
import LowerBody from '../assets/Buttons/lowerbody.png';
import UpperBody from '../assets/Buttons/upperbody.png';

var screenWidth = Dimensions.get('window').width;
var width = screenWidth * .6;
var btnWidth = screenWidth * .4;

const WorkoutPage = () => {
  return (
    <View style={styles.workoutBody}>
      <Text style={styles.heading}>Pick a body part to work on:</Text>
      <View style={styles.workoutContainer}>
        <Image source={Avatar} style={styles.avatar}/>
        <Image source={Arrow} style={styles.arrow}/>
        <View style={styles.textArea}>
          <TouchableOpacity>
            <Image source={UpperBody} style={styles.btn1}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Arm} style={styles.btn2}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={LowerBody} style={styles.btn3}/>
          </TouchableOpacity>
        </View>
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
  textArea: {
    left: '-25%',
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
    left: '-18%',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 32,
    padding: 10,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  text: {
    fontSize: 30,
    padding: 10,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  btn1: {
    width:btnWidth,
    height: btnWidth * .4,
    top:'50%',
  },
  btn2: {
    top:'80%',
    width:btnWidth,
    height: btnWidth * .4,
  },
  btn3: {
    width:btnWidth,
    height: btnWidth * .4,
  }
});

export default WorkoutPage;