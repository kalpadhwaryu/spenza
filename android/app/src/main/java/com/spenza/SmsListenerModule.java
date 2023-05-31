package com.spenza;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SmsListenerModule extends ReactContextBaseJavaModule {
    private static final int SMS_PERMISSION_CODE = 123;
    private static final String EVENT_SMS_RECEIVED = "onSMSReceived";

    private final ReactApplicationContext reactContext;

    public SmsListenerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SmsListenerModule";
    }

    @ReactMethod
    public void startListeningForSms() {
        // Check and request SMS permission if not granted
        if (ContextCompat.checkSelfPermission(reactContext,
                Manifest.permission.RECEIVE_SMS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(getCurrentActivity(),
                    new String[] { Manifest.permission.RECEIVE_SMS }, SMS_PERMISSION_CODE);
        }

        // Register SMS broadcast receiver
        IntentFilter filter = new IntentFilter();
        filter.addAction("android.provider.Telephony.SMS_RECEIVED");
        reactContext.registerReceiver(smsReceiver, filter);
    }

    @ReactMethod
    public void stopListeningForSms() {
        // Unregister SMS broadcast receiver
        reactContext.unregisterReceiver(smsReceiver);
    }

    // SMS broadcast receiver
    private final BroadcastReceiver smsReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
                Bundle bundle = intent.getExtras();
                if (bundle != null) {
                    // Retrieve the SMS messages
                    Object[] pdus = (Object[]) bundle.get("pdus");
                    if (pdus != null) {
                        for (Object pdu : pdus) {
                            SmsMessage smsMessage = SmsMessage.createFromPdu((byte[]) pdu);

                            String sender = smsMessage.getDisplayOriginatingAddress();
                            String message = smsMessage.getDisplayMessageBody();

                            // Emit the event to React Native
                            sendEvent(sender, message);
                        }
                    }
                }
            }
        }
    };

    // Emit event to React Native
    private void sendEvent(String sender, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("sender", sender);
        params.putString("message", message);

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_SMS_RECEIVED, params);
    }
}
