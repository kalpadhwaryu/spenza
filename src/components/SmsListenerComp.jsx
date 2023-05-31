import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';

const SmsListenerComp = () => {
  useEffect(() => {
    requestSMSPermission();
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
