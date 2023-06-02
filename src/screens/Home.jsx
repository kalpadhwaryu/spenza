import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export const HOME_ROUTE = 'Home';

const Home = () => {
  return (
    <View style={tw`bg-white`}>
      <Text style={tw`text-black`}>This is Home</Text>
    </View>
  );
};

export default Home;
