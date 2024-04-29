import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const QuizPage = () => {
  return (
    <View style={styles.quizBody}>
      <Text style={styles.quizText}>Quiz Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quizBody: {
    padding: 10,
    backgroundColor: '#16191F',
  },
  quizText: {
    color: '#FFFFFF',
  },
});

export default QuizPage;