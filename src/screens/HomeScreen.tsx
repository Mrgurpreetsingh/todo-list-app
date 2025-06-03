import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Header from '../components/Header';
import InputTask from '../components/InputTask';

const HomeScreen = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <View style={styles.container}>
      <Header />
      <InputTask onAddTask={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
  },
});

export default HomeScreen;
