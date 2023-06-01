import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {startSmsListener, addSmsReceivedListener} from './SmsListenerModule';
import tw from 'twrnc';

const SmsListenerComp = () => {
  const [receivedSMS, setReceivedSMS] = useState([]);
  const [totalMonthlyAmount, setTotalMonthlyAmount] = useState(0);

  useEffect(() => {
    requestSMSPermission();
    startSmsListener();
    return () => {
      smsReceivedSubscription.remove();
    };
  }, []);

  const smsReceivedSubscription = addSmsReceivedListener(event => {
    const smsList = event.smsList;
    const messagesObj = [];
    let monthlyAmount = 0;

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
        /\b(?:Swiggy|Zomato|Amazon|Flipkart|Myntra|Jio|VI|Airtel|Netflix|Prime|Lenskart|SBI|ICICI|HDFC|BOB|Makemytrip|Goibibo|Airbnb|Expedia|Ola|Uber|Indigo|AirIndia|Vistara)\b/gi;
      const debitRegex = /\bdebit(?:ed)?\b/i;

      const merchants = extractedBody.match(merchantRegex);
      const amounts = extractedBody.match(amountRegex);
      const isDebit = debitRegex.test(extractedBody);

      if (
        isDebit &&
        amounts &&
        amounts.length > 0 &&
        merchants &&
        merchants.length > 0
      ) {
        const extractedAmount = parseInt(amounts[0].slice(2));
        const extractedMerchant = merchants[0];
        let category;
        switch (extractedMerchant) {
          case 'Swiggy':
          case 'Zomato':
            category = 'Food';
            break;
          case 'Amazon':
          case 'Flipkart':
          case 'Myntra':
          case 'Lenskart':
            category = 'Shopping';
            break;
          case 'SBI':
          case 'ICICI':
          case 'HDFC':
          case 'BOB':
            category = 'Banking';
            break;
          case 'Jio':
          case 'Netflix':
          case 'Prime':
          case 'VI':
          case 'Airtel':
            category = 'Recharges & Subscriptions';
            break;
          case 'Makemytrip':
          case 'Goibibo':
          case 'Airbnb':
          case 'Expedia':
          case 'Ola':
          case 'Uber':
          case 'Indigo':
          case 'AirIndia':
          case 'Vistara':
            category = 'Travel';
            break;
          default:
            break;
        }
        const newObj = {
          message: extractedBody,
          amount: extractedAmount,
          merchant: extractedMerchant,
          category: category,
          date: usefulDate,
        };
        messagesObj.push(newObj);
        if (new Date(usefulDate).getMonth() === new Date().getMonth()) {
          monthlyAmount += extractedAmount;
        }
      }
    });
    setReceivedSMS(messagesObj);
    setTotalMonthlyAmount(monthlyAmount);
  });

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
      {/* {receivedSMS.map(each => {
        const purchaseDate =
          new Date(each.date).getDate() +
          '-' +
          (new Date(each.date).getMonth() + 1) +
          '-' +
          new Date(each.date).getFullYear();
        return (
          <View style={tw`my-2`}>
            <Text style={tw`text-black`}>{each.amount}</Text>
            <Text style={tw`text-black`}>{purchaseDate}</Text>
            <Text style={tw`text-black`}>{each.merchant}</Text>
            <Text style={tw`text-black`}>{each.category}</Text>
          </View>
        );
      })} */}
      <View style={tw`border rounded m-5 py-3 bg-gray-50`}>
        <Text style={tw`text-gray-500 text-xl text-center my-2`}>
          This month spend
        </Text>
        <Text style={tw`text-black text-4xl text-center my-1`}>
          {`₹` + totalMonthlyAmount}
        </Text>
      </View>
    </View>
  );
};

export default SmsListenerComp;
