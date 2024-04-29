import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WorkoutPage = () => {
  return (
    <View style={styles.workoutBody}>
      <Text style={styles.workoutText}>Workout Page</Text>
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
});

export default WorkoutPage;