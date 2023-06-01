import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, ScrollView} from 'react-native';
import {startSmsListener, addSmsReceivedListener} from './SmsListenerModule';
import tw from 'twrnc';

const SmsListenerComp = () => {
  const [receivedSMS, setReceivedSMS] = useState([]);
  useEffect(() => {
    requestSMSPermission();
    const smsReceivedSubscription = addSmsReceivedListener(event => {
      const smsList = event.smsList;
      const messagesObj = [];

      smsList.forEach(message => {
        const start = message.indexOf('body:') + 5;
        const end = message.indexOf('service_center:');
        const extractedBody = message.substring(start, end).trim();

        const startDate = message.indexOf('date:') + 5;
        const endDate = message.indexOf('date_sent:');
        const extractedDate = message.substring(startDate, endDate).trim();
        const usefulDate = new Date(Number(BigInt(extractedDate)));

        // regex
        const amountRegex = /\Rs[\d.,]+/ || /\₹[\d.,]+/ || /Rs([\d.,]+)/;
        const merchantRegex =
          /\b(?:Swiggy|Zomato|Amazon|Flipkart|Jio|Lenskart|SBI)\b/gi;

        // also add credited debited terms

        const merchants = extractedBody.match(merchantRegex);
        const amounts = extractedBody.match(amountRegex);

        if (
          amounts &&
          amounts.length > 0 &&
          merchants &&
          merchants.length > 0
        ) {
          const extractedAmount = amounts[0];
          const extractedMerchant = merchants[0];
          let category;
          switch (extractedMerchant) {
            case 'Swiggy' || 'Zomato':
              category = 'Food';
              break;
            case 'SBI':
              category = 'Banking';
              break;
            case 'Jio' || 'Lenskart':
              category = 'Other expenses';
              break;
            default:
              break;
          }
          const newObj = {
            message: extractedBody,
            amount: extractedAmount,
            merchant: extractedMerchant,
            category: category,
            date: usefulDate.toISOString().split('T')[0],
          };
          messagesObj.push(newObj);
        }
      });
      setReceivedSMS(messagesObj);
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
    <ScrollView>
      {receivedSMS.map(each => {
        return (
          <View style={tw`my-2`}>
            <Text style={tw`text-black`}>{each.amount}</Text>
            <Text style={tw`text-black`}>{each.date}</Text>
            <Text style={tw`text-black`}>{each.merchant}</Text>
            <Text style={tw`text-black`}>{each.category}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SmsListenerComp;
