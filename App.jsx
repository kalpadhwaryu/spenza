import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home, {HOME_ROUTE} from './src/screens/Home';
import Expenses, {EXPENSES_ROUTE} from './src/screens/Expenses';
import Spenza, {SPENZA_ROUTE} from './src/screens/Spenza';

const Tab = createBottomTabNavigator();

const ICONS_MAP = {
  Home: 'home',
  Expenses: 'wallet',
  Spenza: 'settings',
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
        <Tab.Screen name={SPENZA_ROUTE} component={Spenza} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
