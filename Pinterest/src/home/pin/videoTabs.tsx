import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getVideos} from './nativePinModule';
import {FlashList} from '@shopify/flash-list';

function VideoTabs() {
  const isFocused = useIsFocused();
  const [userVideos, setUserVideos] = useState(null);
  useEffect(() => {
    if (isFocused) {
      const videos = getVideos().map(item => {
        return {
          path: 'file://' + item.path,
          duration: item.duration,
        };
      });
      setUserVideos(videos);
    }
  }, [isFocused]);
  console.log(userVideos, 'vid');
  return (
    <View style={styles.container}>
      {userVideos ? (
        <FlashList
          data={userVideos}
          estimatedItemSize={200}
          numColumns={4}
          renderItem={({item}) => (
            <View>
              <Image
                style={{width: 120, height: 120}}
                resizeMode="cover"
                source={{uri: item.path}}
              />
              <Text
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 6,
                }}>
                {(item.duration / 60000).toFixed(2)}
              </Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {VideoTabs};
