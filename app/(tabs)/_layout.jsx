import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import WorkoutIcon from '../../assets/App-Icons/workout.png';
import DietIcon from '../../assets/App-Icons/diet.png';
import QuizIcon from '../../assets/App-Icons/quiz.png';
import FightIcon from '../../assets/App-Icons/fight.png';
import ProfileIcon from '../../assets/App-Icons/profile.png';


const TabIcon = ( {icon, color, name, focused} ) => {
    return (
        <View>
            <Image 
            source={icon}
            resizeMode='contain'
            className=" w-7 h-7"/>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs screenOptions={{
            tabBarShowLabel:false,
            tabBarActiveTintColor:'#FFC100',
            tabBarInactiveTintColor:'#FFFFFF',
            tabBarStyle:{
                backgroundColor:'#16191F'
            }}}>
            <Tabs.Screen 
            name='Workout' 
            options={{
                title:"Workout", 
                headerShown:false, 
                tabBarIcon:({color,focused}) => (
                    <TabIcon 
                    icon={WorkoutIcon}
                    name="Workout"/>
            )}}/>
            <Tabs.Screen 
            name='Diet' 
            options={{
                title:"Diet", 
                headerShown:false, 
                tabBarIcon:({color,focused}) => (
                    <TabIcon 
                    icon={DietIcon}
                    name="Diet"/>
            )}}/>
            <Tabs.Screen 
            name='Quiz' 
            options={{
                title:"Quiz", 
                headerShown:false, 
                tabBarIcon:({color,focused}) => (
                    <TabIcon 
                    icon={QuizIcon}
                    name="Quiz"/>
            )}}/>
            <Tabs.Screen 
            name='Fight' 
            options={{
                title:"Fight", 
                headerShown:false, 
                tabBarIcon:({color,focused}) => (
                    <TabIcon 
                    icon={FightIcon}
                    name="Fight"/>
            )}}/>
            <Tabs.Screen 
            name='Settings' 
            options={{
                title:"Settings", 
                headerShown:false, 
                tabBarIcon:({color,focused}) => (
                    <TabIcon 
                    icon={ProfileIcon}
                    name="Settings"/>
            )}}/>
            <Tabs.Screen 
            name='(workout)/Arm' 
            options={{
                headerShown:false,
                href: null,
            }}/>
            <Tabs.Screen 
            name='(workout)/UpperBody' 
            options={{
                headerShown:false,
                href: null,
            }}/>
            <Tabs.Screen 
            name='(workout)/LowerBody' 
            options={{
                headerShown:false,
                href: null,
            }}/>
        </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})