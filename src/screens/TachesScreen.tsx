import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import InputTask from '../components/InputTask';
import TaskList from '../components/TaskList';
import { v4 as uuidv4 } from 'uuid';

type Tache = {
  id: string;
  titre: string;
  complete: boolean;
};

const TachesScreen = () => {
  const [tasks, setTasks] = useState<Tache[]>([]);

  const addTask = (titre: string) => {
    const nouvelleTache: Tache = {
      id: uuidv4(),
      titre,
      complete: false,
    };
    setTasks(prev => [...prev, nouvelleTache]);
  };

  const deleteTask = (idToRemove: string) => {
    setTasks(prev => prev.filter(task => task.id !== idToRemove));
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

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
