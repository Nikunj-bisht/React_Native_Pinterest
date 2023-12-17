import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface IProps{
    navigation:any;
}

function SignUp(props:IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../assests/signupgif.gif')}></Image>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require('../assests/pin.png')}></Image>
      </View>
      <View style={styles.lower}>
        <Text style={styles.welcome}>Welcome to Pinterest</Text>
        <View style={styles.loginOptions}>
          <TextInput style={styles.textInput} placeholder="Email address" />
          <TouchableOpacity onPress={()=>props.navigation.navigate('home')} style={styles.continue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.gfButton}>
            <TouchableOpacity style={styles.facebook}>
              <Text style={styles.continueText}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.google}>
              <Image
                style={styles.googleImage}
                source={require('../assests/google.png')}
                resizeMode="contain"
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.normalText}>
            By continuing, you agree to Pinteresets{' '}
            <Text style={styles.link}>Terms of Service</Text> and acknowledge that you have read our{' '}
            <Text>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upper: {
    flex: 0.6,
    alignItems: 'center',
  },
  lower: {
    flex: 0.5,
    paddingTop: 14,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
  },
  icon: {
    width: '20%',
    height: '20%',
    position: 'absolute',
    bottom: -10,
  },
  welcome: {
    fontWeight: '600',
    fontSize: 24,
  },
  textInput: {
    marginTop: 14,
    backgroundColor: '#e0e0e0',

    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    paddingLeft: 19,
  },
  loginOptions: {
    //   backgroundColor:'red',
    width: '100%',
    paddingHorizontal: 44,
  },
  continue: {
    backgroundColor: '#E60023',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 22,
  },
  continueText: {
    color: 'white',
    fontWeight: '700',
  },
  facebook: {
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
  },
  google: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    // justifyContent:'space-between'
  },
  gfButton: {
    marginTop: 20,
  },
  googleText: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    // backgroundColor:'blue',
    flex: 1,
  },
  googleImage: {
    width: 20,
    height: 20,
  },link:{
    color:'blue',
    fontWeight:'600',
    fontSize:11
  },normalText:{
    fontWeight:'400',
    fontSize:11,
    marginTop:14
  }
});

export default SignUp;
