import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashBoard} from './dashboard';
import Search from './search';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Notification} from './notification';

const Tab = createBottomTabNavigator();

function Home({navigation, onPress}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%','25%'], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        opacity={0}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={() => navigation.popToTop()}
        {...props}
      />
    ),
    [],
  )
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
            tabPress: e => {
              e.preventDefault();
              bottomSheetRef.current.expand();
              // navigation.navigate("create")
            },
          }}>
          {props => <View></View>}
        </Tab.Screen>
        <Tab.Screen
          options={{headerShown: false}}
          name="notification"
          component={Notification}></Tab.Screen>
        <Tab.Screen options={{headerShown: false}} name="profile">
          {props => <View></View>}
        </Tab.Screen>
      </Tab.Navigator>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        // backgroundStyle={{backgroundColor:'red'}}
        // onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style={{fontWeight: '600', fontSize: 20}}>
            Start creating now 🎉
          </Text>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1,width:'43%'}}>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('pin')} style={{height:70,width:65,backgroundColor:'#e0e0e0',borderRadius:20}}>
              
              </TouchableOpacity>
              <Text style={{marginTop:8}}>Pin</Text>
            </View>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('pin')} style={{height:70,width:65,backgroundColor:'#e0e0e0',borderRadius:20}}>
              
              </TouchableOpacity>
              <Text style={{marginTop:8}}>Board</Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'pink'
    // justifyContent:'center'
  },
});

export default Home;
