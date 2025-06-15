import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { TasksContext } from '../context/TasksContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const TaskContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const TaskText = styled.Text<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #333;
  text-decoration-line: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const CheckIcon = styled(Icon)`
  margin-right: 10px;
`;

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTask, deleteTask } = useContext(TasksContext)!;

  return (
    <TaskContainer onPress={() => toggleTask(task.id)}>
      <CheckIcon
        name={task.completed ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color="#4CAF50"
      />
      <TaskText completed={task.completed}>{task.text}</TaskText>
      <Icon
        name="delete"
        size={24}
        color="#d32f2f"
        onPress={() => deleteTask(task.id)}
      />
    </TaskContainer>
  );
};

export default TaskItem;
