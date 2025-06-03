import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import InputTask from '../components/InputTask';
import TaskList from '../components/TaskList';

const HomeScreen = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <View style={styles.container}>
      <Header />
      <InputTask onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
