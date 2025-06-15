import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { TasksContext, Task } from '../context/TasksContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  TaskDetail: { taskId: string; task?: Task };
  AddTask: { taskId: string; task?: Task };
};

type RouteProp = StackScreenProps<RootStackParamList, 'TaskDetail'>['route'];
type NavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f2f2f2;
  padding: 20px;
`;

const CenteredContent = styled.View`
  align-items: center;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

interface StatusProps {
  completed: boolean;
}

const StatusText = styled.Text<StatusProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.completed ? '#4CAF50' : '#FF4444')};
`;

const StatusIcon = styled(Icon)`
  margin-right: 8px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

interface ActionButtonProps {
  backgroundColor: string;
}

const ActionButton = styled(Pressable)<ActionButtonProps>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-horizontal: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TaskDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp>();
  const taskId = params.taskId;
  const taskCtx = useContext(TasksContext);
  const navigation = useNavigation<NavigationProp>();

  if (!taskCtx) {
    console.error('TasksContext is undefined');
    return null;
  }

  const { tasks, deleteTask } = taskCtx;
  const task = tasks.find((t: Task) => t.id === taskId);

  console.log('TaskDetailScreen params:', { taskId, task });

  if (!task || taskId === 'new') {
    navigation.navigate('AddTask', { taskId: 'new' });
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      console.log('Tâche supprimée:', task.id);
      navigation.goBack();
    } catch (error) {
      console.error('Erreur suppression tâche:', error);
    }
  };

  const handleEdit = () => {
    console.log('Navigation vers AddTask avec:', { taskId: task.id, task });
    navigation.navigate('AddTask', { taskId: task.id, task });
  };

  return (
    <Container>
      <CenteredContent>
        <Card>
          <Title>{task.title}</Title>
          <Description>
            {task.description || 'Aucune description disponible'}
          </Description>
          <StatusContainer>
            <StatusIcon
              name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
              size={20}
              color={task.completed ? '#4CAF50' : '#FF4444'}
            />
            <StatusText completed={task.completed}>
              Statut : {task.completed ? 'Complétée' : 'En cours'}
            </StatusText>
          </StatusContainer>
        </Card>
        <ButtonContainer>
          <ActionButton backgroundColor="#4CAF50" onPress={handleEdit}>
            <ButtonText>Modifier</ButtonText>
          </ActionButton>
          <ActionButton backgroundColor="#FF4444" onPress={handleDelete}>
            <ButtonText>Supprimer</ButtonText>
          </ActionButton>
        </ButtonContainer>
      </CenteredContent>
    </Container>
  );
};

export default TaskDetailScreen;
