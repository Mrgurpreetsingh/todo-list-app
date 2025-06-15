import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string, description: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
  isLoading: boolean;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        console.log('Chargement des tâches depuis AsyncStorage');
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Erreur chargement tâches:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      console.log('Tâches sauvegardées:', newTasks.length);
    } catch (error) {
      console.error('Erreur sauvegarde tâches:', error);
    }
  };

  const addTask = async (title: string, description: string) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const toggleComplete = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const updateTask = async (id: string, title: string, description: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: title.trim(), description: description.trim() } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleComplete, deleteTask, updateTask, isLoading }}>
      {children}
    </TasksContext.Provider>
  );
};
