import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

type Props = {
  onAddTask: (task: string) => void;
};

const InputTask = ({ onAddTask }: Props) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      onAddTask(task);
      setTask('');
      Keyboard.dismiss(); // Ferme le clavier
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ajouter une tâche"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button title="Ajouter" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default InputTask;
