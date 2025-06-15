import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { AppContext } from '../context/AppContext';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useContext(AppContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace('MainApp');
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Identifiants incorrects');
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
      <LoginButton onPress={handleLogin}>
        <ButtonText>Se connecter</ButtonText>
      </LoginButton>
      <SwitchSignup onPress={() => navigation.navigate('Signup')}>
        <SwitchText>Pas de compte ? S'inscrire</SwitchText>
      </SwitchSignup>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SwitchSignup = styled.TouchableOpacity`
  align-items: center;
`;

const SwitchText = styled.Text`
  color: #4CAF50;
  font-size: 14px;
`;
