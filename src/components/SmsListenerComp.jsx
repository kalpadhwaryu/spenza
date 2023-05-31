import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {startSmsListener, addSmsReceivedListener} from './SmsListenerModule';

const SmsListenerComp = () => {
  useEffect(() => {
    requestSMSPermission();
    const smsReceivedSubscription = addSmsReceivedListener(event => {
      const smsList = event.smsList;
      const extractedBodies = [];

      smsList.forEach(message => {
        const start = message.indexOf('body:') + 5; // add 5 to skip "body:"
        const end = message.indexOf('service_center:');
        const extractedBody = message.substring(start, end).trim();
        extractedBodies.push(extractedBody);
      });

      console.log(extractedBodies);
    });

    startSmsListener();

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
