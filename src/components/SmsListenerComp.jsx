import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {startSmsListener, addSmsReceivedListener} from './SmsListenerModule';

const SmsListenerComp = () => {
  useEffect(() => {
    requestSMSPermission();
    const smsReceivedSubscription = addSmsReceivedListener(event => {
      const smsList = event.smsList;
      // Handle the received SMS messages
      console.log(smsList);
    });

    // Start listening for SMS messages
    startSmsListener();

    // Clean up the subscription when the component unmounts
    return () => {
      smsReceivedSubscription.remove();
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
