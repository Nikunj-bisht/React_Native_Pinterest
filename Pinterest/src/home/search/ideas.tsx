import React, { useEffect, useState } from 'react';
import {Image, Text, View} from 'react-native';

export function Card({url, text,item}) {
    console.log(url,'urllll')
  return (
    <View style={{flexDirection: 'row',flex:1,justifyContent:'space-between',marginTop:10,overflow: 'hidden'}}>
      <View style={{flex:0.48,height:100,overflow:'hidden'}}>
        <Image resizeMode='cover' source={{uri: url}} style={{width:'100%',height:"100%",borderRadius:20}}/>
        <View style={{width:'100%',height:'100%',position:'absolute',backgroundColor: 'rgba(0, 0, 0, 0.3)',alignItems:'center',justifyContent:'center',overflow:'hidden',borderRadius:20}}>
          <Text style={{color:'white',fontSize:13,fontWeight:'600'}}>{item?.photographer}</Text>
          {/* <Text style={{color:'white',fontWeight:'700',fontSize:20}}>{item?.alt}</Text> */}
        </View>
        {/* <Text>Interest</Text> */}
      </View>
      <View style={{flex:0.48,height:100}}>
        <Image resizeMode='cover' source={{uri: url}} style={{width:'100%',height:'100%',borderRadius:20}}/>
        <View style={{width:'100%',height:'100%',position:'absolute',backgroundColor: 'rgba(0, 0, 0, 0.3)',alignItems:'center',justifyContent:'center',borderRadius:20}}>
          <Text style={{color:'white',fontSize:13,fontWeight:'600'}}>{item?.photographer}</Text>
          {/* <Text style={{color:'white',fontWeight:'700',fontSize:20}}>{item?.alt}</Text> */}
        </View>
      </View>
    </View>
  );
}

function Ideas() {
    const [data,setData] = useState([]);
    useEffect(() => {
        fetch('https://api.pexels.com/v1/search?query=christmas&per_page=5', {
          headers: {
            Authorization:
              'yKt6IciAc8Wgqf1A6C4RwKEa8y4nis42UQgRkhsdOJDpC0gDUOya2O1G',
          },
        })
          .then(res => res.json())
          .then(dat => setData(dat.photos));
      }, []);
  return <View style={{flex:1,width:'100%',paddingHorizontal:12,marginTop:20}}>
    <Text style={{fontWeight:'600',fontSize:18,textAlign:'center'}}>Pupular on Pinterest</Text>
    {
        data.map((item)=><Card text={''} item={item} url={item.src.medium}/>)
    }
  </View>;
}

export default Ideas;
