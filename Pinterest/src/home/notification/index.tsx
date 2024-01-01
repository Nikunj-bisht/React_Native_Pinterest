import { FlashList } from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function Collection({item}){
    console.log(item,'item111111')
    return (
        <View style={styles.collection}>
          <Text style={{fontWeight:'600'}}>Pins inspired by you</Text>
          <View style={styles.imgCollection}>
            <Image resizeMode='cover' style={{flex:0.34}} source={{uri:item.img1}}/>

            <Image resizeMode='cover' style={{flex:0.35,marginLeft:1,marginRight:1}} source={{uri:item.img2}}/>

            <Image resizeMode='cover' style={{flex:0.34}} source={{uri:item.img3}}/>
          </View>
        </View>
    )
}

export function Notification() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.pexels.com/v1/curated?per_page=40&page=8', {
      headers: {
        Authorization:
          'yKt6IciAc8Wgqf1A6C4RwKEa8y4nis42UQgRkhsdOJDpC0gDUOya2O1G',
      },
    })
      .then(res => res.json())
      .then(dat => 
        {
            console.log(dat,'dop')
            let tempData = [];
            let pointer = -1;
            while(pointer<=30){
                let obj = {
                    img1:'',
                    img2:'',
                    img3:''
                }
                obj.img1 = dat.photos[++pointer].src.medium;

                obj.img2 = dat.photos[++pointer].src.medium;
                obj.img3 = dat.photos[++pointer].src.medium;
                tempData.push(obj);
                console.log(tempData,'tempo')
            }
            
            setData(tempData)
        }).catch(err=>console.log(err,'errr'));
  }, []);
  console.log(data,'dataaa')
  return <View style={styles.container}>{data.length > 0 ? (
    <FlashList
      estimatedItemSize={200}
      data={data}
      showsVerticalScrollIndicator={false}
    //   numColumns={2}
      // ItemSeparatorComponent={() => <View style={{height: 20}} />}
      extraData={data}
      renderItem={({item}) => {
        return <Collection item={item}/>;
      }}
    />
  ) : null}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },collection:{
   paddingHorizontal:8,
   marginTop:20
  },imgCollection:{
    flexDirection:'row',
    // width:'100%',
    height:200,
    borderRadius:20,
    overflow:'hidden',
    marginTop:12
  }
});
