import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../intro/splash';
import {View} from 'react-native';
import SignUp from '../intro/signup';
import Home from '../home';
import { PostDetails } from '../posts';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={Splash}
            name="splash"
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            component={SignUp}
            name="signup"
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            component={Home}
            name="home"></Stack.Screen>
            <Stack.Screen name='detail' component={PostDetails}>

            </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Navigation;
