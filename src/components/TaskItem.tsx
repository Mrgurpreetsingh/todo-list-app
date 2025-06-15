import React from 'react';
import styled from 'styled-components/native';
import { Task } from '../context/TasksContext';

interface TaskItemProps {
  task: Task;
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

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <TaskContainer>
      <TaskText completed={task.completed}>{task.title}</TaskText>
    </TaskContainer>
  );
};

export default TaskItem;
