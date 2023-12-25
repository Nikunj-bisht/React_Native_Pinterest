import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { DashBoard } from './dashboard';
import Search from './search';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="home"
        component={DashBoard}></Tab.Screen>
      <Tab.Screen
        options={{headerShown: false}}
        name="search"
        component={Search}></Tab.Screen>
      {/* <Tab.Screen
        options={{headerShown: false}}
        name="add"
        component={<></>}></Tab.Screen>
      <Tab.Screen
        options={{headerShown: false}}
        name="comment"
        component={() => <></>}></Tab.Screen>
      <Tab.Screen
        options={{headerShown: false}}
        name="profile"
        component={() => <></>}></Tab.Screen> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
