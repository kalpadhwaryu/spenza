import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export const SETTINGS_ROUTE = 'Settings';

const Settings = () => {
  return (
    <View>
      <Text style={tw`text-black`}>This is Settings</Text>
    </View>
  );
};

export default Settings;
