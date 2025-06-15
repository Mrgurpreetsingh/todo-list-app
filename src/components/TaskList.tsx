import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Task } from '../context/TasksContext';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TaskText = styled.Text<{ completed: boolean }>`
  font-size: 16px;
  color: #333;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const CompleteButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 8px;
  border-radius: 4px;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: #d32f2f;
  padding: 8px;
  border-radius: 4px;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  color: white;
`;

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleComplete }) => {
  const renderItem = ({ item }: { item: Task }) => (
    <TaskContainer>
      <TaskText completed={item.completed}>{item.title}</TaskText>
      <ButtonContainer>
        <CompleteButton onPress={() => onToggleComplete(item.id)}>
          <ButtonText>{item.completed ? 'Annuler' : 'Terminer'}</ButtonText>
        </CompleteButton>
        <DeleteButton onPress={() => onDeleteTask(item.id)}>
          <ButtonText>Supprimer</ButtonText>
        </DeleteButton>
      </ButtonContainer>
    </TaskContainer>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TaskList;
