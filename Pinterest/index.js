/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log(enabled,'enab')
  if (enabled) {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('Authorization status:', authStatus,token);
  }
}
requestUserPermission()

AppRegistry.registerComponent(appName, () => App);
