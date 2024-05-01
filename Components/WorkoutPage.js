import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Avatar from '../assets/Avatars/Male/CALLIO.png';
const WorkoutPage = () => {
  return (
    <View style={styles.workoutBody}>
      <Image source={Avatar} style={styles.avatar}/>
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
    width: 500, 
    height: 500, 
    tintColor: '#FFFFFF', 
  },
});

export default WorkoutPage;