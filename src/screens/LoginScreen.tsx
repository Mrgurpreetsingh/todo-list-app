import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { AppContext } from '../context/AppContext';
import { Alert } from 'react-native'; // ✔️ Corrige le message TypeScript + ESLint

const LoginScreen = ({ navigation }: any) => {
  const { login } = useContext(AppContext)!;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      login(username);
      navigation.replace('MainApp');
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects'); // 👍 Pas de `alert()` JS ici
    }
  };

  return (
    <Container>
      <Title>Connexion</Title>
      <Input
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
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
    </Container>
  );
};

export default LoginScreen;

// styled-components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #6200ee;
  padding: 12px 24px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
