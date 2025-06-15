import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
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

const Button = styled.TouchableOpacity`
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
      console.log('Tentative de connexion avec email:', email.trim());
      await login(email.trim(), password);
      console.log('Connexion réussie');
    } catch (error: any) {
      console.error('Erreur connexion:', error.message || error);
      Alert.alert('Erreur', error.message || 'Échec de la connexion');
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!email.trim()) {
        Alert.alert('Erreur', 'Veuillez entrer un email');
        return;
      }
      console.log('Envoi email de réinitialisation pour:', email.trim());
      await auth().sendPasswordResetEmail(email.trim());
      console.log('Email de réinitialisation envoyé');
      Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
    } catch (error: any) {
      console.error('Erreur réinitialisation:', error.message || error);
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
