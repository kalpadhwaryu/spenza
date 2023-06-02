import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export const EXPENSES_ROUTE = 'Expenses';

const Expenses = () => {
  return (
    <View>
      <Text style={tw`text-black`}>This is Expenses</Text>
    </View>
  );
};

export default Expenses;
