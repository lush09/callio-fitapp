import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions,TouchableOpacity, Modal, Pressable } from 'react-native';
import Avatar from '../../assets/Avatars/Male/body.png';
import Arrow from '../../assets/arrows.png';
import Arm from '../../assets/Buttons/arm.png';
import LowerBody from '../../assets/Buttons/lowerbody.png';
import UpperBody from '../../assets/Buttons/upperbody.png';
import { useFonts } from 'expo-font';

var screenWidth = Dimensions.get('window').width;
var width = screenWidth * .6;
var btnWidth = screenWidth * .4;

const WorkoutBody = () => {
  
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../../assets/Font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../../assets/Font/Poppins-Bold.ttf'),
    'Poppins-Black': require('../../assets/Font/Poppins-Black.ttf'),
  });

  return (
    <View className=" pt-20">
      <Text style={styles.heading}>Pick a body part to work on:</Text>
      <View style={styles.workoutContainer}>
        <Image source={Avatar} style={styles.avatar}/>
        <Image source={Arrow} style={styles.arrow}/>
        <View style={styles.textArea}>
          <TouchableOpacity onPress={() => setselectVisible(false)} style={styles.btn1}>
            <Image source={UpperBody} style={styles.btnImage}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Image source={Arm} style={styles.btnImage}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn3}>
            <Image source={LowerBody} style={styles.btnImage}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const WorkoutPage = () => {
  const [activePage, setActivePage] = useState('Workouts');

  const renderPage = () => {
    switch (activePage) {
      case 'UpperBody':
        return <WorkoutPage />;
      case 'Arm':
        return <DietPage />;
      case 'LowerBody':
        return <DietPage />;
      default:
        return <WorkoutBody />;
    }
  };
  return (
    <View style={styles.workoutBody}>
        {renderPage()}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  workoutBody: {
    padding: 10,
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
    top:'6%'
  },
  btn2: {
    top:'26%'
  },
  btn3: {
    top:'47%'
  },
  btnImage: {
    width:btnWidth,
    height: btnWidth * .4,
  },
});

export default WorkoutPage;