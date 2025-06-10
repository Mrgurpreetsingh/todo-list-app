import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import InputTask from '../components/InputTask';
import TaskList from '../components/TaskList';
import { TasksContext } from '../context/tasksContext';

const TachesScreen = () => {
  const taskCtx = useContext(TasksContext);

  // Si le contexte n'est pas encore dispo, on évite une erreur
  if (!taskCtx) {return null;}

  const { tasks, addTask, deleteTask, toggleComplete } = taskCtx;

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
});

export default TachesScreen;
