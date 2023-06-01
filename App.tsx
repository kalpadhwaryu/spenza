import React, {useEffect} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import SplashScreen from 'react-native-splash-screen';
import SmsListener from './src/components/SmsListenerComp';
import Header from './src/components/Header';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={tw`bg-white h-full`}>
      <Header />
      <SmsListener />
    </View>
  );
};

export default App;
