import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {
  return (
    <View style={styles.main}>
      <Link href="/Workout">Workout</Link>
    </View>
  )
}

const styles = StyleSheet.create({
    main: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",
    }
})