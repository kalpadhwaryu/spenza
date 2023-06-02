import React, {useEffect} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import SplashScreen from 'react-native-splash-screen';
import SmsListener from './src/components/SmsListenerComp';
import Header from './src/components/Header';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home, {HOME_ROUTE} from './src/screens/Home';
import Expenses, {EXPENSES_ROUTE} from './src/screens/Expenses';
import Settings, {SETTINGS_ROUTE} from './src/screens/Settings';

const Tab = createBottomTabNavigator();

const ICONS_MAP = {
  Home: 'home',
  Expenses: 'wallet',
  Settings: 'settings',
};

const generateTabBarIcon =
  route =>
  ({focused, size}) => {
    const iconName = ICONS_MAP[route.name];
    const icon = focused ? iconName : `${iconName}-outline`;
    return <Ionicons name={icon} size={size} color="black" />;
  };

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    // <View style={tw`bg-white h-full`}>
    //   <Header />
    //   <SmsListener />
    // </View>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: generateTabBarIcon(route),
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
        })}>
        <Tab.Screen name={HOME_ROUTE} component={Home} />
        <Tab.Screen name={EXPENSES_ROUTE} component={Expenses} />
        <Tab.Screen name={SETTINGS_ROUTE} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
