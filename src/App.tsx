import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //obligatoire pour que le SafeAreaView prenne toute la hauteur de l'écran.
    backgroundColor: '#fff', // Optionnel, selon le theme
  },
});

export default App;
