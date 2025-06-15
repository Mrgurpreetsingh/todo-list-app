import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  Tâches: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 14px 40px;
  border-radius: 8px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <Title>Bienvenue dans votre To-Do List !</Title>
      <Button onPress={() => navigation.navigate('Tâches')}>
        <ButtonText>Voir mes tâches</ButtonText>
      </Button>
    </Container>
  );
};

export default HomeScreen;
