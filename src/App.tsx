import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AppProvider } from './context/AppContext';
import { TasksProvider } from './context/TasksContext';

export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppProvider>
        <TasksProvider>
          <AppNavigator />
        </TasksProvider>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;