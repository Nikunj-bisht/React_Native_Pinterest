import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Creators from './creators';
import Ideas from './ideas';
import SearchOptions from './searchOptions';

function RenderItem({item}) {
  console.log(item);
  return (
    <View style={{width: Dimensions.get('window').width}}>
      <Image
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}
        source={{uri: item.src.medium}}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>
          {item.photographer}
        </Text>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 20}}>
          {item.alt}
        </Text>
      </View>
    </View>
  );
}

function Search() {
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef(null);
  const indexref = useRef(0);
  function onScroll(ev) {
    const ind = ev.nativeEvent.contentOffset.x / Dimensions.get('window').width;
    let roundIndex = Math.round(ind);
    if (roundIndex === data.length - 1) {
      roundIndex = 0;
    }
    indexref.current = roundIndex;
  }
  function startScroll() {
    console.log('hey');

    setInterval(() => {
      ref.current?.scrollToIndex({
        animated: true,
        index: (parseInt(indexref.current) + 1) % 19,
      });
    }, 4000);
  }
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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {!showSearch ? (
          <>
            <View style={styles.search}>
              {data.length > 0 ? (
                <FlashList
                  onScroll={ev => onScroll(ev)}
                  onLayout={() => startScroll()}
                  ref={ref}
                  pagingEnabled
                  estimatedItemSize={200}
                  extraData={data}
                  horizontal
                  data={data}
                  renderItem={({item}) => <RenderItem item={item} />}
                />
              ) : null}
            </View>
            <Creators />
            <Ideas />
          </>
        ) : <SearchOptions/>}

        <View
          style={{
            position: 'absolute',
            paddingHorizontal: 12,
            height: 140,
            top: 15,
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={()=>setShowSearch(!showSearch)}
            style={{
              backgroundColor: 'white',
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              paddingLeft: 20,
            }}>
            <TextInput onFocus={()=>setShowSearch(!showSearch)} placeholder="Search for ideas"></TextInput>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: 400,
  },
});

export default Search;
