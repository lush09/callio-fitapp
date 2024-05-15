import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Image, Dimensions,TouchableOpacity, Modal, Pressable } from 'react-native';
import Avatar from '../../assets/Avatars/Male/body.png';
import Arrow from '../../assets/arrows.png';
import Arm from '../../assets/Buttons/arm.png';
import LowerBody from '../../assets/Buttons/lowerbody.png';
import UpperBody from '../../assets/Buttons/upperbody.png';
import { Link } from 'expo-router';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var height = screenHeight * .5;
var width = screenWidth * .5;
var btnWidth = screenWidth * .4;

const WorkoutPage = () => {
  return (
    <View className=" p-5" style={styles.workoutBody}>
      <Text className=' font-pblack text-white text-3xl'>Workouts</Text>
      <Text className=' font-plight text-white text-2xl'>Choose a body part:</Text>
      <View style={styles.workoutContainer} className=' pt-10 justify-center align-middle'>
        <Image source={Avatar} style={styles.avatar}/>
        <View style={styles.textAndArrowArea}>
          <Image source={Arrow} style={styles.arrow}/>
          <View style={styles.textArea}>
            <Link href="/UpperBody" style={styles.gap} className="py-7">
              <Image source={UpperBody} style={styles.btnImage}/>
            </Link>
            <Link href="/Arm" style={styles.gap} className="py-8">
              <Image source={Arm} style={styles.btnImage}/>
            </Link>
            <Link href="/LowerBody" className="py-8">
              <Image source={LowerBody} style={styles.btnImage}/>
            </Link>
          </View>
          
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
  workoutContainer:{
    flexDirection: 'row',
    left: -(screenWidth*.05)
  },
  imageContainer:{
  },
  workoutBody: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#16191F',
    height:"100%"
  },
  workoutText: {
    color: '#FFFFFF',
  },
  textAndArrowArea: {
    right: screenWidth * .25,
    flexDirection: 'row',
    color: '#FFFFFF',
  },
  textArea: {
    top: -(screenHeight*.035),
    height: screenHeight*5,
    color: '#FFFFFF',
  },
  avatar: {
    width: screenWidth*.5,
    height: screenHeight*.7,
  },
  arrow: {
    width: screenWidth*.5,
    height: screenHeight*.7,
  },
  
  heading: {
    fontSize: 32,
    padding: 10,
    color: '#ffffff',
  },
  text: {
    fontSize: 30,
    padding: 10,
    color: '#ffffff',
  },
  btnImage: {
    width:btnWidth,
    height: btnWidth * .4,
  },
  gap: {
    marginBottom: screenHeight*.05
  }
});

export default WorkoutPage;