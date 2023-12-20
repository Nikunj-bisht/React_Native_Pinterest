import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

export const PostedImages = ({item, onPress = () => {}}) => {
  console.log(item);
  return (
    <TouchableHighlight
      onPress={() => onPress(item.id)}
      style={[styles.imagecontainer]}>
      <>
        <Image
          style={[styles.image]}
          resizeMode="cover"
          source={{uri: item.src.medium}}></Image>
        <Text
          numberOfLines={2}
          style={{paddingHorizontal: 10, marginTop: 5, height: 30}}>
          {item.alt}
        </Text>
      </>
    </TouchableHighlight>
  );
};

function DashBoard({navigation}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.pexels.com/v1/curated?per_page=100&page=8', {
      headers: {
        Authorization:
          'yKt6IciAc8Wgqf1A6C4RwKEa8y4nis42UQgRkhsdOJDpC0gDUOya2O1G',
      },
    })
      .then(res => res.json())
      .then(dat => setData(dat.photos));
  }, []);
  function gotoPostDetails(id) {
    navigation.navigate('detail', {
      id: id,
    });
  }
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text style={{fontWeight: '600'}}>All</Text>
        <View
          style={{
            height: 5,
            backgroundColor: 'black',
            width: 30,
            borderRadius: 20,
          }}></View>
      </View>
      {/* {data.map(item => (
        <PostedImages item={item} />
      ))} */}
      {data.length > 0 ? (
        <FlashList
          estimatedItemSize={200}
          data={data}
          numColumns={2}
          // ItemSeparatorComponent={() => <View style={{height: 20}} />}
          extraData={data}
          renderItem={({item}) => {
            return <PostedImages item={item} onPress={gotoPostDetails} />;
          }}
        />
      ) : null}
    </View>
  );
}
function getRandomHeight() {
  let arr = [230, 300, 270, 350];
  return arr[Math.floor(Math.random() * arr.length)];
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imagecontainer: {
    width: '100%',
    height: 330,
    // marginTop: 12,
    justifyContent: 'center',
    paddingHorizontal: 4,
    // flexWrap:'wrap-reverse'
    // height: '100%',
    // flex:1
  },
  image: {
    width: '100%',
    height: '88%',
    borderRadius: 20,
  },
});

export {DashBoard};
