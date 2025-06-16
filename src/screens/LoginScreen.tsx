import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { Task } from '../context/TasksContext';

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
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
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

const LinkText = styled.Text`
  color: #4CAF50;
  text-align: center;
  margin-top: 16px;
`;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AppContext);
  const navigation = useNavigation<NavigationProp>();

  if (!context) {
    console.error('AppContext is undefined');
    return null;
  }

  const { login } = context;

  const handleLogin = async () => {
    try {
      const trimmedEmail = email.trim();
      console.log('Tentative de connexion avec email:', trimmedEmail);
      await login(trimmedEmail, password);
      console.log('Connexion réussie');
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } catch (error: any) {
      console.error('Erreur connexion:', error.code, error.message);
      Alert.alert('Erreur', error.message || 'Échec de la connexion');
    }
  };

  const handleResetPassword = async () => {
    try {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        Alert.alert('Erreur', 'Veuillez entrer un email');
        return;
      }
      console.log('Envoi email de réinitialisation pour:', trimmedEmail);
      await auth().sendPasswordResetEmail(trimmedEmail);
      console.log('Email de réinitialisation envoyé');
      Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
    } catch (error: any) {
      console.error('Erreur réinitialisation:', error.code, error.message);
      Alert.alert('Erreur', error.message || 'Échec de l\'envoi');
    }
  };

  return (
    <Container>
      <Title>Connexion</Title>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      <Button onPress={handleLogin}>
        <ButtonText>Se connecter</ButtonText>
      </Button>
      <LinkText onPress={handleResetPassword}>
        Mot de passe oublié ?
      </LinkText>
      <LinkText onPress={() => navigation.navigate('Signup')}>
        Pas de compte ? Inscrivez-vous
      </LinkText>
    </Container>
  );
};

export default LoginScreen;
