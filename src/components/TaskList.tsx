// src/components/TaskList.tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

type Props = {
  tasks: string[];
};

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
  },
});

export default TaskList;
