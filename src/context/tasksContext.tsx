import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Tache = {
  id: string;
  titre: string;
  complete: boolean;
};

type TasksContextType = {
  tasks: Tache[];
  addTask: (titre: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Tache[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const stored = await AsyncStorage.getItem('todolist');
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todolist', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (titre: string) => {
    const newTask: Tache = { id: Date.now().toString(), titre, complete: false };
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleComplete }}>
      {children}
    </TasksContext.Provider>
  );
};
