import React, { useContext } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import InputTask from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { TasksContext } from '../context/TasksContext';

const TachesScreen = () => {
  const taskCtx = useContext(TasksContext);

  if (!taskCtx) {
  return null;
}


  const { tasks, addTask, deleteTask, toggleComplete, isLoading } = taskCtx;

  if (isLoading) {
    // Affichage pendant le chargement des tâches
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des tâches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <InputTask onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TachesScreen;
