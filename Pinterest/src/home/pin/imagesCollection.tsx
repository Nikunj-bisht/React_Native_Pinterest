import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { getImages } from "./nativePinModule";
import { FlashList } from "@shopify/flash-list";



function ImagesCollection({imageUpload}){
    const [images,setImages] = useState(null)
    useEffect(() => {
        const img = getImages().map(item => 'file://' + item);
    
        setImages(img);
      }, []);
    return (
       <View style={styles.container}>
        {images && (
        <FlashList
          numColumns={4}
          estimatedItemSize={200}
          data={images}
          extraData={images}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>imageUpload(item)}>
            <Image
              style={{width: 120, height: 120}}
              resizeMode="cover"
              source={{uri: item}}
              
            />
            </TouchableOpacity>
          )}
        />
      )}
       </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})

export {ImagesCollection}