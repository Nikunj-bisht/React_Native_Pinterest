package com.pinterest;

import android.net.Uri;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.List;

public class MediaPinModule extends ReactContextBaseJavaModule {
    private final String pinModule = "pinModule";
    ReactApplicationContext reactApplicationContext;
    @NonNull
    @Override
    public String getName() {

        return pinModule;
    }
    public MediaPinModule(ReactApplicationContext reactApplicationContext){
        this.reactApplicationContext = reactApplicationContext;
    }
    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getImages(){
        List<String> li = MediaPinCollection.getImages(reactApplicationContext);
//        Toast.makeText(reactApplicationContext,li.get(1),Toast.LENGTH_LONG).show();
        WritableArray writableArray = new WritableNativeArray();

        for(String str : li){
            writableArray.pushString(str);
        }
         return writableArray;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getVideos(){
        List<MediaPinCollection.Video> li = MediaPinCollection.getVideos(reactApplicationContext);
        WritableArray writableArray = new WritableNativeArray();

        for(MediaPinCollection.Video str : li){
            WritableMap writableMap = new WritableNativeMap();
            writableMap.putInt("duration",str.duration);
            writableMap.putString("path",str.videoPath);
            writableArray.pushMap(writableMap);
        }

        return writableArray;
    }
}
