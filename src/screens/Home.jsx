import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, PermissionsAndroid} from 'react-native';
import {
  startSmsListener,
  addSmsReceivedListener,
} from '../components/SmsListenerModule';
import tw from 'twrnc';
import Card from '../components/Card';
import {create} from 'zustand';

export const HOME_ROUTE = 'Home';

export const useExpensesStore = create(set => ({
  receivedSMS: [],
  setReceivedSMS: receivedSMS => set(() => ({receivedSMS})),
  totalMonthlyAmount: 0,
  setTotalMonthlyAmount: totalMonthlyAmount =>
    set(() => ({totalMonthlyAmount})),
}));

const Home = () => {
  const {receivedSMS, setReceivedSMS, setTotalMonthlyAmount} =
    useExpensesStore();

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
    <ScrollView style={tw`p-3 bg-white h-full`}>
      <Text style={tw`text-black font-bold text-2xl my-2`}>Home</Text>
      <View style={tw`m-2 py-3 border rounded bg-blue-200`}>
        <Text style={tw`text-black text-2xl text-center my-2`}>
          Welcome to Spenza!
        </Text>
        <Text style={tw`text-black text-xl text-center my-1 mx-2`}>
          Know your expenses across Travel, Food, Shopping...
        </Text>
      </View>
      <Text style={tw`text-black font-bold text-xl my-2 text-xl`}>
        Recent Expenses
      </Text>
      <View style={tw`my-3`}>
        {receivedSMS.slice(0, 6).map((each, i) => {
          return (
            <Card
              key={i}
              index={i}
              name={each.merchant}
              amount={each.amount}
              category={each.category}
              date={each.date}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Home;
