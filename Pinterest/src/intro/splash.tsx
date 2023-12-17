import React, {useEffect} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, View} from 'react-native';

interface IProps {
  navigation: any;
}

function Splash(props: IProps) {
  useEffect(() => {
    let timer = setTimeout(() => {
      props.navigation.navigate('signup');
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assests/pin.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex:1,
    height: '100%',
    width: '50%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
