import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {useExpensesStore} from './Home';
import {dummyData} from '../data/DummyData';

export const SETTINGS_ROUTE = 'Settings';

const Settings = () => {
  const {setReceivedSMS} = useExpensesStore();

  return (
    <View style={tw`items-center justify-center`}>
      <Text style={tw`text-black text-2xl`}>Spenza</Text>
      <Text style={tw`text-black`}>
        Spenza is a spend analytics app which reads users SMS, filters out
        expense/spend messages using keywords and categorizes them into Travel,
        Food, Shopping, Subscription expenses, etc.{' '}
      </Text>
      <Text style={tw`text-black`}>
        Switch to Dummy Data to get a better visulization experience
      </Text>
      <Text onPress={() => setReceivedSMS(dummyData)}>Use Dummy Data</Text>
    </View>
  );
};

export default Settings;
