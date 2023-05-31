import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import SplashScreen from 'react-native-splash-screen';
import SmsListener from './src/components/SmsListenerComp';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <Text style={tw`text-black`}>Hello World</Text>
      <SmsListener />
    </View>
  );
};

export default App;
