import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../context/AppContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import TachesScreen from '../screens/TachesScreen';
import ContactScreen from '../screens/ContactScreen';
import LogoutScreen from '../screens/LogoutScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import MenuBurger from '../components/MenuBurger';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Task } from '../context/TasksContext';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  TaskDetail: { taskId: string; task?: Task };
  AddTask: { taskId: string; task?: Task };
};

type RootDrawerParamList = {
  Tabs: undefined;
  Contact: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Tâches: undefined;
  Déconnexion: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }): BottomTabNavigationOptions => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Tâches') {
          iconName = 'list';
        } else if (route.name === 'Déconnexion') {
          iconName = 'exit-to-app';
        } else {
          iconName = 'help';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: '#666',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Tâches" component={TachesScreen} />
    <Tab.Screen name="Déconnexion" component={LogoutScreen} />
  </Tab.Navigator>
);

const MainApp = () => (
  <Drawer.Navigator
    initialRouteName="Tabs"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerLabelStyle: { fontSize: 18, color: 'black', fontWeight: 'bold' },
      drawerActiveTintColor: '#4CAF50',
      drawerInactiveTintColor: '#666',
      headerLeft: () => <MenuBurger />,
      headerStyle: { backgroundColor: '#f2f2f2' },
      headerTintColor: '#333',
    }}
  >
    <Drawer.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ drawerLabel: 'Accueil', title: 'Accueil' }}
    />
    <Drawer.Screen
      name="Contact"
      component={ContactScreen}
      options={{ drawerLabel: 'Contact', title: 'Contact' }}
    />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(AppContext)!;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
