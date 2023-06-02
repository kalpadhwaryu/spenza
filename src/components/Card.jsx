import React from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';

const Card = ({name, amount, category, date}) => {
  const purchaseDate =
    new Date(date).getDate() +
    '-' +
    (new Date(date).getMonth() + 1) +
    '-' +
    new Date(date).getFullYear();
  return (
    <View style={tw`mx-2 border p-2`}>
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
