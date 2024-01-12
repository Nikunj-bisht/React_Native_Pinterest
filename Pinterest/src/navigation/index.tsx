import React, {useCallback, useRef} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../intro/splash';
import {Linking, View} from 'react-native';
import SignUp from '../intro/signup';
import Home from '../home';
import {PostDetails} from '../posts';
import messaging from '@react-native-firebase/messaging';
import Add from './add';
import PinPhotos from '../home/pin';

const Stack = createStackNavigator();
const deepLinksConf = {
  screens: {
    home: {
      screens: {
        home: 'home',
      },
    },
    detail: {
      screens: {
        detail: 'detail/:id',
      },
    },
  },
};
const linking: LinkingOptions = {
  prefixes: ['myapp://'],
  config: deepLinksConf,
  async getInitialURL() {
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Check if there is an initial firebase notification
    const message = await messaging().getInitialNotification();

    // Get deep link from data
    // if this is undefined, the app will open the default/home page
    return message?.data?.link;
  },
  subscribe(listener) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    // Listen to firebase push notifications
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        const url = message?.data?.link;
        console.log(listener, 'list');
        if (url) {
          // Any custom logic to check whether the URL needs to be handled

          // Call the listener to let React Navigation handle the URL
          listener(url);
        }
      },
    );

    return () => {
      // Clean up the event listeners
      // Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};

function Navigation() {
  const ref = useRef();
  
  console.log('render')
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <NavigationContainer ref={ref} linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            component={Splash}
            name="splash"
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            component={SignUp}
            name="signup"
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name="home">
            {props => (
              <Home
                {...props}
                onPress={()=>{}}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            name="detail"
            component={PostDetails}></Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            name="create"
            component={Add}></Stack.Screen>
             <Stack.Screen
            options={{headerShown: false}}
            name="pin"
            component={PinPhotos}></Stack.Screen>
             <Stack.Screen
            options={{headerShown: false}}
            name="pinupload"
            component={()=><></>}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default Navigation;
