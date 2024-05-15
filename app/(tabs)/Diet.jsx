import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { updateCharacterDetails, getCharacter } from '../../Database/database';

const RadioButton = ({ label, value, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.radioButton, isSelected ? styles.radioButtonSelected : null]}
    onPress={() => onPress(value)}
  >
    <View style={styles.radioButtonOuterCircle}>
      {isSelected && <View style={styles.radioButtonInnerCircle} />}
    </View>
    <Text style={styles.radioButtonLabel}>{label}</Text>
  </TouchableOpacity>
);

const DietPage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [bmr, setBmr] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../../assets/font/Poppins-Light.ttf'),
    'Poppins-Bold': require('../../assets/font/Poppins-Light.ttf'),
    'Poppins-Black': require('../../assets/font/Poppins-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
  };

  const handleCalculateBMR = async () => {
    const character = await getCharacter();
    const { gender } = character;

    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);
    const ageValue = parseFloat(age);

    let bmrValue;
    if (gender === 'male') {
      bmrValue = 10 * weightInKg + 6.25 * heightInCm - 5 * ageValue + 5;
    } else {
      bmrValue = 10 * weightInKg + 6.25 * heightInCm - 5 * ageValue - 161;
    }

    const activityMultiplier = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9,
    }[activityLevel];

    const finalBmr = bmrValue * activityMultiplier;
    setBmr(finalBmr);
    setShowResult(true); 

    await updateCharacterDetails(heightInCm, weightInKg, ageValue, activityLevel);
  };

  const isButtonDisabled = !height || !weight || !age;

  return (
    <View style={styles.dietContainer} className=" p-5">
      <Text style={styles.dietText}>CALORIE INTAKE</Text>
      <Text style={styles.dietTextBold}>CALCULATOR</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Height(CM)"
          placeholderTextColor={'#808080'}
          color={'#fff'}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight(KG)"
          placeholderTextColor={'#808080'}
          color={'#fff'}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor={'#808080'}
          color={'#fff'}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>
      
      <View style={styles.activityLevelContainer}>
        <Text style={styles.activityLevelText}>Activity Level</Text>
        <RadioButton
          label="Sedentary"
          value="sedentary"
          isSelected={activityLevel === 'sedentary'}
          onPress={handleActivityLevelChange}
        />
        <RadioButton
          label="Lightly Active"
          value="lightlyActive"
          isSelected={activityLevel === 'lightlyActive'}
          onPress={handleActivityLevelChange}
        />
        <RadioButton
          label="Moderately Active"
          value="moderatelyActive"
          isSelected={activityLevel === 'moderatelyActive'}
          onPress={handleActivityLevelChange}
        />
        <RadioButton
          label="Very Active"
          value="veryActive"
          isSelected={activityLevel === 'veryActive'}
          onPress={handleActivityLevelChange}
        />
        <RadioButton
          label="Extra Active"
          value="extraActive"
          isSelected={activityLevel === 'extraActive'}
          onPress={handleActivityLevelChange}
        />
        <TouchableOpacity
          style={[styles.calculateButton, isButtonDisabled && styles.calculateButtonDisabled]}
          onPress={handleCalculateBMR}
          disabled={isButtonDisabled}
        >
          <Text style={styles.calculateButtonText}>CALCULATE</Text>
        </TouchableOpacity>
        {showResult && (
          <Text style={styles.resultText}>
            You should have a {bmr.toFixed(0)} kcal intake per day in order to maintain weight.
          </Text>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dietContainer: {
    backgroundColor: '#16191F',
    paddingTop: StatusBar.currentHeight,
    height: '100%'
  },
  dietText: {
    fontSize: 24,
    fontFamily: 'Poppins-Light',
    color: '#fff',
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    letterSpacing: 1,
  },
  dietTextBold: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    paddingLeft: 10,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 5,
    marginLeft: 10,
    padding: 10,
    width: '50%',
    marginBottom: 20,
    borderRadius: 8,
  },
  activityLevelContainer: {
    marginLeft: 10,
  },
  activityLevelText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  radioButtonLabel: {
    color: '#fff',
    marginLeft: 10,
  },
  resultText: {
    color: '#fff',
    fontFamily: 'Poppins-Light',
    marginTop: 20,
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 8,
    width: '50%',
    borderRadius: 5,
  },
  calculateButtonText: {
    color: '#000',
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  }
});

export default DietPage;