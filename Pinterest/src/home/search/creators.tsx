import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Ideas from './ideas';

function CreatorItem({item}) {
  console.log(item, 'iuu');
  return (
    <View
      style={{width: 120, height: 200, borderRadius: 20, alignItems: 'center'}}>
      <Image
        resizeMode="cover"
        source={{uri: item.src.medium}}
        style={{height: '93%', width: '100%', borderRadius: 20}}
      />
      <Image
        resizeMode="cover"
        source={{uri: item.src.small}}
        style={{
          height: '22%',
          width: '38%',
          borderRadius: 30,
          position: 'absolute',
          bottom: 0
          ,borderWidth:1,borderColor:'white'
        }}
      />
      <View style={{position:'absolute',backgroundColor:'white',borderRadius:20,padding:5,marginTop:6,left:7}}>
        <Text style={{fontWeight:'500',fontSize:10}}>1.05</Text>
      </View>
    </View>
  );
}

function Creators() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.pexels.com/v1/curated?per_page=8&page=13', {
      headers: {
        Authorization:
          'yKt6IciAc8Wgqf1A6C4RwKEa8y4nis42UQgRkhsdOJDpC0gDUOya2O1G',
      },
    })
      .then(res => res.json())
      .then(dat => setData(dat.photos));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.creatortext}>Ideas from creators</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item)=>item.id}
          contentContainerStyle={{paddingHorizontal: 10}}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          horizontal={true}
          extraData={data}
          // estimatedItemSize={200}
          renderItem={({item})=><CreatorItem item={item}/>}
        />
      ) : null}
      {/* <Ideas/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
    // flex:1
  },
  creatortext: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Creators;
