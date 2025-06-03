// src/components/TaskList.tsx
import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity, // ✅ Import ajouté
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // ✅ Import ajouté

type Props = {
  tasks: string[];
  onDeleteTask: (index: number) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onDeleteTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.taskItem}>
          <Text>{item}</Text>
          <TouchableOpacity onPress={() => onDeleteTask(index)}>
            <Icon name="delete" size={20} color="red" />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TaskList;
