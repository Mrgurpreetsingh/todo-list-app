import React, { useContext } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { TasksContext, Task } from '../context/TasksContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  TaskDetail: { taskId: string; task?: Task };
  AddTask: { taskId: string; task?: Task };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: black;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
`;

const TaskItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const TaskTitle = styled.Text<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  color: black;
  margin-left: 10px;
  text-decoration-line: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const DeleteButton = styled.Pressable`
  padding: 5px;
`;

const FloatingButton = styled.Pressable`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #4CAF50;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 8;
`;

const TachesScreen: React.FC = () => {
  const taskCtx = useContext(TasksContext);
  const navigation = useNavigation<NavigationProp>();

  if (!taskCtx) {
    console.error('TasksContext is undefined');
    return null;
  }

  const { tasks, toggleComplete, deleteTask, isLoading } = taskCtx;

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#4CAF50" />
        <LoadingText>Chargement des tâches...</LoadingText>
      </LoadingContainer>
    );
  }

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}>
      <Pressable onPress={() => toggleComplete(item.id)}>
        <Icon
          name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={24}
          color={item.completed ? '#4CAF50' : '#666'}
        />
      </Pressable>
      <TaskTitle completed={item.completed}>
        {item.title}
      </TaskTitle>
      <DeleteButton onPress={() => deleteTask(item.id)}>
        <Icon name="delete" size={24} color="#FF4444" />
      </DeleteButton>
    </TaskItem>
  );

  return (
    <Container>
      <Title>Mes Tâches</Title>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<TaskTitle completed={false}>Aucune tâche</TaskTitle>}
      />
      <FloatingButton onPress={() => navigation.navigate('AddTask', { taskId: 'new' })}>
        <Icon name="add" size={30} color="white" />
      </FloatingButton>
    </Container>
  );
};

export default TachesScreen;
