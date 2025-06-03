// src/components/TaskList.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

type Task = {
  id: string;
  title: string;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>{item.title}</Text>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default TaskList;

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
