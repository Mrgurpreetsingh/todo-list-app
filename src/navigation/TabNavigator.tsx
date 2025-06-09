import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TachesScreen from '../screens/TachesScreen';
import AccueilScreen from '../screens/AccueilScreen';
import ContactScreen from '../screens/ContactScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AccueilTabIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home-outline" color={color} size={size} />
);

const TachesTabIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="list-outline" color={color} size={size} />
);
const ContactTabIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="mail-outline" color={color} size={size} />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={AccueilScreen}
        options={{
          tabBarIcon: AccueilTabIcon,
        }}
      />
      <Tab.Screen
        name="Tâches"
        component={TachesScreen}
        options={{
          tabBarIcon: TachesTabIcon,
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ContactTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
