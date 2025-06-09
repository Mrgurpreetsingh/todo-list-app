import React, { createContext, useState, ReactNode } from 'react';

type User = {
  username: string;
};

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type AppContextType = {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  tasks: Task[];
  addTask: (task: Task) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const login = (username: string) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, tasks, addTask }}>
      {children}
    </AppContext.Provider>
  );
};
