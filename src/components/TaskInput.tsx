import React, { useState } from 'react';
import styled from 'styled-components/native';

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

const Container = styled.View`
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

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <Container>
      <Input
        placeholder="Nouvelle tâche"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      <AddButton onPress={handleAddTask}>
        <ButtonText>Ajouter</ButtonText>
      </AddButton>
    </Container>
  );
};

export default TaskInput;
