import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import { AppProvider } from './context/AppContext';
import { TasksProvider } from './context/tasksContext'; // <-- 💡 ajoute cette ligne

const App = () => {
  return (
    <AppProvider>
      <TasksProvider> {/* <-- 💡 entoure ici */}
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </TasksProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
