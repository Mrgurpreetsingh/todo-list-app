import React, { useContext } from 'react';
import { FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import { TasksContext } from '../context/TasksContext';
import { AppContext } from '../context/AppContext';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import MenuBurger from '../components/MenuBurger';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: #d32f2f;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const HomeScreen: React.FC = () => {
  const { tasks } = useContext(TasksContext)!;
  const { logout } = useContext(AppContext)!;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Échec de la déconnexion');
    }
  };

  return (
    <Container>
      <MenuBurger />
      <Title>My To-Do List</Title>
      <TaskInput />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id}
      />
      <LogoutButton onPress={handleLogout}>
        <ButtonText>Déconnexion</ButtonText>
      </LogoutButton>
    </Container>
  );
};

export default HomeScreen;
