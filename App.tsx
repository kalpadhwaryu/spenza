import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <Text style={tw`text-black`}>Hello World</Text>
    </View>
  );
};

export default App;
