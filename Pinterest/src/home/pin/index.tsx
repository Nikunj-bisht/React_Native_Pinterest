import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TabPhotos from "./imagesTab";

function Header(){
   return (
    <View style={{paddingHorizontal:12}}>
    <TouchableOpacity style={{alignSelf:'flex-end',paddingVertical:16,paddingHorizontal:12,backgroundColor:'#e0e0e0',borderRadius:23}}>
        <Text>Next</Text>
    </TouchableOpacity>
    </View>
   )
}

function PinPhotos({navigation}){
   return (
      <View style={styles.container}>
      <Header/>
      <TabPhotos navigation={navigation}/>
      </View>       
   )
}

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})

export default PinPhotos;