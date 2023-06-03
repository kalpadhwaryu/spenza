import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {useExpensesStore} from './Home';
import {dummyData} from '../data/DummyData';

export const SPENZA_ROUTE = 'Spenza';

const Spenza = () => {
  const {setReceivedSMS} = useExpensesStore();

  return (
    <View style={tw`p-4 items-center justify-center h-full bg-white`}>
      <Text style={tw`text-black text-3xl my-2 font-bold`}>Spenza</Text>
      <Text style={tw`text-black text-black my-2 text-center`}>
        Spenza is a spend analytics app which reads users SMS, filters out
        expense/spend messages using keywords and categorizes them into Travel,
        Food, Shopping, Subscription expenses, etc.{' '}
      </Text>
      <Text style={tw`text-black text-black my-2 text-center font-bold`}>
        Switch to Dummy Data to get a better visualization experience
      </Text>
      <TouchableOpacity
        style={tw`bg-blue-400 px-3 py-2 rounded my-4`}
        onPress={() => setReceivedSMS(dummyData)}>
        <Text style={tw`text-black`}>Use Dummy Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Spenza;
