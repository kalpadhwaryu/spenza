package com.spenza;

import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.Telephony;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.List;

public class SmsListenerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final String SMS_RECEIVED_EVENT = "smsReceived";

    public SmsListenerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SmsListenerModule";
    }

    @ReactMethod
    public void startSmsListener() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            // Use Telephony.Sms.Inbox.CONTENT_URI for API level 19 and above
            Uri uri = Telephony.Sms.Inbox.CONTENT_URI;
            ContentResolver contentResolver = reactContext.getContentResolver();
            Cursor cursor = contentResolver.query(uri, null, null, null, null);

            if (cursor != null && cursor.moveToFirst()) {
                List<String> smsList = new ArrayList<>();

                do {
                    String msgData = "";
                    for (int idx = 0; idx < cursor.getColumnCount(); idx++) {
                        msgData += " " + cursor.getColumnName(idx) + ":" + cursor.getString(idx);
                    }

                    smsList.add(msgData);
                } while (cursor.moveToNext());

                cursor.close();

                if (smsList.size() > 0) {
                    sendSmsReceivedEvent(smsList);
                }
            }
        } else {
            Toast.makeText(reactContext, "SMS reading is not supported on this device.", Toast.LENGTH_SHORT).show();
        }
    }

    private void sendSmsReceivedEvent(List<String> smsList) {
        WritableMap event = Arguments.createMap();
        WritableArray smsArray = new WritableNativeArray();

        for (String sms : smsList) {
            smsArray.pushString(sms);
        }

        event.putArray("smsList", smsArray);

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(SMS_RECEIVED_EVENT, event);
    }
}
