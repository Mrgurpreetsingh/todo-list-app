import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { TasksContext, Task } from '../context/TasksContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  TaskDetail: { taskId: string; task?: Task };
  AddTask: { taskId: string; task?: Task };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProp = StackScreenProps<RootStackParamList, 'AddTask'>['route'];

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  color: black;
  font-size: 16px;
`;

const DescriptionInput = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  color: black;
  font-size: 16px;
  height: 100px;
  text-align-vertical: top;
`;

const Button = styled.Pressable`
  background-color: #4CAF50;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const AddTaskScreen: React.FC = () => {
  const { params } = useRoute<RouteProp>();
  const taskId = params?.taskId;
  const existingTask = params?.task;
  const taskCtx = useContext(TasksContext);
  const navigation = useNavigation<NavigationProp>();
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
    }
  }, [existingTask]);

  if (!taskCtx) {
    console.error('TasksContext is undefined');
    return null;
  }

  const { addTask, updateTask } = taskCtx;

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un titre.');
      return;
    }
    try {
      if (taskId === 'new') {
        console.log('Ajout de tâche:', title, description);
        await addTask(title, description);
        console.log('Tâche ajoutée');
      } else {
        console.log('Modification de tâche:', taskId, title, description);
        await updateTask(taskId, title, description);
        console.log('Tâche modifiée');
      }
      navigation.goBack();
    } catch (error: any) {
      console.error('Erreur sauvegarde tâche:', error);
      Alert.alert('Erreur', 'Échec de la sauvegarde de la tâche');
    }
  };

  return (
    <Container>
      <Title>{taskId === 'new' ? 'Nouvelle Tâche' : 'Modifier Tâche'}</Title>
      <Input
        placeholder="Titre de la tâche"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      <DescriptionInput
        placeholder="Description de la tâche"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#999"
      />
      <Button onPress={handleSave}>
        <ButtonText>{taskId === 'new' ? 'Ajouter' : 'Enregistrer'}</ButtonText>
      </Button>
    </Container>
  );
};

export default AddTaskScreen;
