import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PostedImages} from '../home/dashboard';

interface IProps {
  route: any;
}

function Follow({photoGrapherLink, photographer}) {
  console.log(photoGrapherLink);
  return (
    <View style={{marginBottom: 16}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: photoGrapherLink}}
            style={{borderRadius: 20, width: 40, height: 40}}
          />
          <View style={{marginLeft: 12}}>
            <Text style={{fontWeight: '600'}}>{photographer}</Text>
            <Text>45k followers</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: '#e0e0e0',
            paddingVertical: 12,
            paddingHorizontal: 12,
          }}>
          <Text style={{textAlign: 'center', fontWeight: '600'}}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <Text>Comme</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 30,
              backgroundColor: '#e0e0e0',
              paddingVertical: 18,
              paddingHorizontal: 18,
            }}>
            <Text>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 30,
              backgroundColor: '#E60023',
              paddingVertical: 18,
              paddingHorizontal: 18,
            }}>
            <Text style={{color: 'white', fontWeight: '600'}}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <Text>Share</Text>
        </View>
      </View>
    </View>
  );
}

export function PostDetails(props: IProps) {
  const [imageDetails, setImageDetails] = useState({});
  const [suggestedImages, setSuggestedImages] = useState([]);
  console.log(imageDetails);
  useEffect(() => {
    fetch(`https://api.pexels.com/v1/photos/${props.route.params.id}`, {
      headers: {
        Authorization:
          'yKt6IciAc8Wgqf1A6C4RwKEa8y4nis42UQgRkhsdOJDpC0gDUOya2O1G',
      },
    })
      .then(data => data.json())
      .then(res => {
        setImageDetails(res);
        fetchSuggestion(res.alt.split(' ')[0]);
      });
  }, []);
  async function fetchSuggestion(keyWord) {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${keyWord}&per_page=100`,
      {
        headers: {
          Authorization:
            'yKt6IciAc8Wgqf1A6C4RwKEa8y4nis42UQgRkhsdOJDpC0gDUOya2O1G',
        },
      },
    );
    const jsonresult = await response.json();
    setSuggestedImages(jsonresult.photos);
  }
  return (
    <ScrollView
      nestedScrollEnabled={false}
      contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        {Object.keys(imageDetails).length > 0 ? (
          <>
            {suggestedImages.length > 0 ? (
              <FlashList
                estimatedItemSize={200}
                data={suggestedImages}
                numColumns={2}
                ListHeaderComponent={() => (
                  <>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{uri: imageDetails.src.medium}}
                      />
                    </View>
                    <Follow
                      photoGrapherLink={imageDetails.src.small}
                      photographer={imageDetails.photographer}
                    />
                  </>
                )}
                // ItemSeparatorComponent={() => <View style={{height: 20}} />}
                extraData={suggestedImages}
                renderItem={({item}) => {
                  return <PostedImages item={item} />;
                }}
              />
            ) : null}
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 450,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
