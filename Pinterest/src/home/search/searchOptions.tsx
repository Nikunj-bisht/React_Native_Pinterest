import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


function SearchOptions(){
   const [data,setData] = useState(["Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe","Tasty Receipe"])
   return (
    <View style={styles.container}>
        <FlashList data={data} estimatedItemSize={200} renderItem={({item})=><Text style={{fontWeight:'700',paddingVertical:14}}>{item}</Text>}/>
    </View>
   )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:80,
        paddingHorizontal:12
    }
})

export default SearchOptions;