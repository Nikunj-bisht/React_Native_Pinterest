import React, { useMemo, useRef } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { DashBoard } from './dashboard';
import Search from './search';
import BottomSheet from '@gorhom/bottom-sheet';
import { Notification } from './notification';

const Tab = createBottomTabNavigator();

function Home({navigation,onPress}) {
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['30%'], []);

  return (
    <>
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="home"
        component={DashBoard}></Tab.Screen>
      <Tab.Screen
        options={{headerShown: false}}
        name="search"
        component={Search}></Tab.Screen>
      <Tab.Screen
        options={{headerShown: false}}
        name="add"
        listeners={{
          tabPress:(e)=>{
            e.preventDefault()
            onPress()
            // navigation.navigate("create")
          }
        }}>
          {(props)=><View></View>}
        </Tab.Screen>
      <Tab.Screen
        options={{headerShown: false}}
        name="notification"
        component={Notification}></Tab.Screen>
        <Tab.Screen
        options={{headerShown: false}}
        name="profile">
                    {(props)=><View></View>}

        </Tab.Screen>

    </Tab.Navigator>
    <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        // backgroundStyle={{backgroundColor:'red'}}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style={{fontWeight:'600',fontSize:20}}>Start creating now 🎉</Text>
        </View>
      </BottomSheet>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
