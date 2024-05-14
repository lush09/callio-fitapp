import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Image, Dimensions,TouchableOpacity, Modal, Pressable } from 'react-native';
import Avatar from '../../assets/Avatars/Male/body.png';
import Arrow from '../../assets/arrows.png';
import Arm from '../../assets/Buttons/arm.png';
import LowerBody from '../../assets/Buttons/lowerbody.png';
import UpperBody from '../../assets/Buttons/upperbody.png';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

var screenWidth = Dimensions.get('window').width;
var width = screenWidth * .65;
var btnWidth = screenWidth * .4;

const WorkoutPage = () => {
  
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../../assets/font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../../assets/font/Poppins-Bold.ttf'),
    'Poppins-Black': require('../../assets/font/Poppins-Black.ttf'),
  });

  return (
    <View className=" pt-20" style={styles.workoutBody}>
      <Text style={styles.heading}>Pick a body part to work on:</Text>
      <View style={styles.workoutContainer}>
        <Image source={Avatar} style={styles.avatar}/>
        <Image source={Arrow} style={styles.arrow}/>
        <View style={styles.textArea}>
          <Link href="/UpperBody" style={styles.btn1} className="py-6 bottom-3">
            <Image source={UpperBody} style={styles.btnImage}/>
          </Link>
          <Link href="/Arm" style={styles.btn2} className="py-6 mt-20">
            <Image source={Arm} style={styles.btnImage}/>
          </Link>
          <Link href="/LowerBody" style={styles.btn3} className="py-6 mt-24">
            <Image source={LowerBody} style={styles.btnImage}/>
          </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  workoutBody: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
    height:"100%"
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
    left: '-17%',
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
  btnImage: {
    width:btnWidth,
    height: btnWidth * .4,
  },
});

export default WorkoutPage;