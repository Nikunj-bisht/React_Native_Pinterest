import { NativeModules } from "react-native";

const {pinModule} = NativeModules;

 function getImages(){
  return  pinModule.getImages();
}
function getVideos(){
  return pinModule.getVideos()
}

export {getImages,getVideos}
