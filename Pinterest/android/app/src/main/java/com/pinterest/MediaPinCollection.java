package com.pinterest;

import android.content.ContentUris;
import android.content.Context;
import android.database.Cursor;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;

import androidx.loader.content.CursorLoader;

import java.io.File;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class MediaPinCollection {

    static class Video {
        public String videoPath;
        public int duration;

        public Video(String videoPath, int duration) {
            this.videoPath = videoPath;
            this.duration = duration;
        }
    }

    public static MediaMetadataRetriever mediaMetadataRetriever = new MediaMetadataRetriever();

    public static List<String> getImages(Context context) {
        Uri collection;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            collection = MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL);
        } else {
            collection = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        }
        String[] projection = new String[]{MediaStore.Images.Media.DATA,
                MediaStore.Images.Media._ID,
                MediaStore.Images.Media.BUCKET_DISPLAY_NAME,
                MediaStore.Images.Media.DATE_TAKEN};
        final String orderBy = MediaStore.Images.Media.DATE_TAKEN;

        List<String> li = new ArrayList<>();
        try (Cursor cursor = context.getContentResolver().query(collection, projection, null, null, orderBy + " DESC")) {
            int idColumn = cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID);
            int count = 0;

            while (cursor.moveToNext()) {
                long id = cursor.getLong(idColumn);
                Uri uri = ContentUris.withAppendedId(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, id);
                String[] proj = {MediaStore.Images.Media.DATA};

                li.add(cursor.getString(0));


            }

        } catch (Exception e) {
        } finally {

        }

        return li;

    }

    public static List<Video> getVideos(Context context) {

        List<Video> videoList = new ArrayList<>();
        Uri collection;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            collection = MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL);
        } else {
            collection = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
        }
        String[] projection = new String[]{
                MediaStore.Images.Media.DATA,
                MediaStore.Video.Media._ID,
                MediaStore.Video.Media.DURATION,
                MediaStore.Video.Media.DATE_TAKEN
        };
        String selection = MediaStore.Video.Media.DURATION +
                " >= ?";
        String[] selectionArgs = new String[]{
                String.valueOf(TimeUnit.MILLISECONDS.convert(5, TimeUnit.MINUTES))
        };
        String sortOrder = MediaStore.Video.Media.DATE_TAKEN + " ASC";

        try (Cursor cursor = context.getContentResolver().query(collection, projection, null, null, sortOrder)) {
            int durationColumn =
                    cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DURATION);
            while (cursor.moveToNext()) {
                int duration = cursor.getInt(durationColumn);

                videoList.add(new Video(cursor.getString(0), duration));
            }
        }

        return videoList;


    }


}
