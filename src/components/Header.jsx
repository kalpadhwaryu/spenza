import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

const Header = () => {
  return (
    <View style={tw`w-full my-2`}>
      <Text style={tw`text-black text-center text-2xl`}>Spenza</Text>
    </View>
  );
};

export default Header;
