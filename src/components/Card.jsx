import React from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';

const Card = ({name, amount, category, date, index}) => {
  const purchaseDate =
    String(new Date(date).getDate()).padStart(2, '0') +
    '-' +
    String(new Date(date).getMonth() + 1).padStart(2, '0') +
    '-' +
    new Date(date).getFullYear();
  return (
    <View
      style={tw`mx-2 border p-2 my-1 rounded ${
        index % 2 === 0 ? 'bg-yellow-200' : 'bg-blue-200'
      }`}>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-black font-bold text-lg`}>{name}</Text>
        <Text style={tw`text-black font-bold text-lg`}>{`₹` + amount}</Text>
      </View>
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`text-black`}>{category}</Text>
        <Text style={tw`text-black`}>{purchaseDate}</Text>
      </View>
    </View>
  );
};

export default Card;
