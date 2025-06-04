// src/components/TaskList.tsx
import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

type Tache = {
  id: string;
  titre: string;
  complete: boolean;
};

type Props = {
  tasks: Tache[];
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onDeleteTask, onToggleComplete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          id={item.id}
          text={item.titre}
          completed={item.complete}
          toggleComplete={onToggleComplete}
          deleteTask={onDeleteTask}
        />
      )}
    />
  );
};

export default TaskList;
