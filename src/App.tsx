import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './context/AppContext';
import { TasksProvider } from './context/TasksContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <AppProvider>
      <TasksProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TasksProvider>
    </AppProvider>
  );
};

export default App;
