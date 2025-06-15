import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { TasksContext } from '../context/TasksContext';
import { v4 as uuidv4 } from 'uuid';

const InputContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  flex: 1;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 12px;
  border-radius: 8px;
  margin-left: 10px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TaskInput: React.FC = () => {
  const { addTask } = useContext(TasksContext)!;
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask({ id: uuidv4(), text: taskText, completed: false });
      setTaskText('');
    }
  };

  return (
    <InputContainer>
      <Input
        placeholder="Ajouter une tâche"
        value={taskText}
        onChangeText={setTaskText}
        placeholderTextColor="#999"
      />
      <AddButton onPress={handleAddTask}>
        <ButtonText>Ajouter</ButtonText>
      </AddButton>
    </InputContainer>
  );
};

export default TaskInput;
