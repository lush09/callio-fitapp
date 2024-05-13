import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <>
    <Slot className=" mt-20"/>
    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({
 main: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
 }
})