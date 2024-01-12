import React, {useCallback, useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

function Add() {
  const viewref = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;

  console.log(viewref, 'view');
  const position = useCallback(ev => {
    viewref?.current?.setNativeProps({
      style: {
        top: ev.nativeEvent.locationY,
        left: ev.nativeEvent.locationX,
      },
    });
  }, []);
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) =>
      //   true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      
      onPanResponderMove: 
        Animated.event([null, {dx: pan.x, dy: pan.y}])

        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      ,
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;
  return (
    <>
      <View
        //  {...panResponder.panHandlers}
        style={styles.outer}>
           <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>

        <View ref={viewref} style={styles.comp}></View>
        </Animated.View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  comp: {
    height: 70,
    width: 70,
    backgroundColor: 'blue',
    // position: 'absolute',
  },
  outer: {flex: 1, backgroundColor: 'red'},
});

export default Add;
