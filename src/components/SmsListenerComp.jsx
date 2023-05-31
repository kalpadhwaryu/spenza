import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {NativeModules, NativeEventEmitter} from 'react-native';

const SmsListenerModule = NativeModules.SmsListenerModule;
const SmsListenerEvents = new NativeEventEmitter(SmsListenerModule);

const SmsListenerComp = () => {
  const handleIncomingSms = event => {
    const {sender, message} = event;
    // Do something with the received SMS
    console.log('Received SMS from:', sender);
    console.log('Message:', message);
  };

  useEffect(() => {
    requestSMSPermission();
    SmsListenerModule.startListeningForSms();

    // Register a listener for the 'onSMSReceived' event
    const smsListenerSubscription = SmsListenerEvents.addListener(
      'onSMSReceived',
      handleIncomingSms,
    );

    // Clean up: stop listening for incoming SMS and remove the listener
    return () => {
      SmsListenerModule.stopListeningForSms();
      smsListenerSubscription.remove();
    };
  }, []);

  const requestSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your SMS messages.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SMS permission granted');
      } else {
        console.log('SMS permission denied');
      }
    } catch (error) {
      console.log('Failed to request SMS permission:', error);
    }
  };
  return (
    <View>
      <Text>SmsListener</Text>
    </View>
  );
};

export default SmsListenerComp;
