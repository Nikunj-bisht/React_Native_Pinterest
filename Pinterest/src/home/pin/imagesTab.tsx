import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {VideoTabs} from './videoTabs';
import {ImagesCollection} from './imagesCollection';

function TabPhotos(props) {
  const {navigation} = props;
  const [selectedImages, setSelectedImages] = useState([]);
  const [selecteditem,setSelectedItem] = useState(null);
  function addImages(item) {
    let temp = [];
    selectedImages.forEach(i=>temp.push(i))
    temp.push(item);
    setSelectedImages(temp);
  }
  useEffect(()=>{
   if(selecteditem){
    addImages(selecteditem)
   }
  },[selecteditem])
  function Navi(item) {
    navigation.navigate('pinupload', {
      uri: item,
    });
  }
  const {
    data = [
      {
        title: 'Photos',
        children: <ImagesCollection imageUpload={item => setSelectedItem(item)} />,
      },
      {
        title: 'Videos',
        children: <VideoTabs />,
      },
      {
        title: 'All',
        children: <View style={{backgroundColor: 'pink', flex: 1}}></View>,
      },
    ],
  } = props;
  const [images, setImages] = useState(null);

  console.log(images, 'img');
  const [current, setCurrent] = useState(0);
  return (
    <View style={styles.container}>
      <View
        style={{
          // flexDirection: 'row',
          // width: '40%',
          flex: 1,
          // alignSelf: 'center',
          // justifyContent: 'space-between',
          // marginBottom: 14,
        }}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:'40%',alignSelf:'center',marginBottom:12}}> 

        {data.map((item, index) => {
          return (
            <Text
            style={current === index ? styles.selectedStyle : {}}
            onPress={() => setCurrent(index)}>
              {item.title}
            </Text>
          );
        })}
        </View>
        {data[current].children}
      </View>
      {selectedImages.length > 0 ? (
        <View style={{justifyContent:'center',alignItems:'center',paddingBottom:12,paddingTop:8,borderWidth:0.6,borderColor:'grey'}}>
          {
            <ScrollView horizontal={true}>
              {selectedImages.map(item => (
                <Image
                  source={{uri: item}}
                  style={{width: 50, height: 50,borderRadius:10,marginLeft:12}}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          }
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems:'center'
  },
  selectedStyle: {
    color: 'black',
    fontWeight: '600',
  },
});

export default TabPhotos;
