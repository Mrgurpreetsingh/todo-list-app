import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { AppContext } from '../context/AppContext';

const SignupScreen = ({ navigation }: any) => {
  const { login } = useContext(AppContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Ici tu peux appeler ta fonction signup (à créer) ou utiliser Firebase directement
      // Par exemple, si tu as une fonction signup dans AppContext
      // await signup(email, password);

      // Pour simplifier, on simule un login direct après inscription :
      await login(email, password);
      navigation.replace('MainApp');
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <Container>
      <Title>Inscription</Title>
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
      <SignupButton onPress={handleSignup}>
        <ButtonText>S'inscrire</ButtonText>
      </SignupButton>
      <SwitchLogin onPress={() => navigation.navigate('Login')}>
        <SwitchText>Déjà un compte ? Se connecter</SwitchText>
      </SwitchLogin>
    </Container>
  );
};

export default SignupScreen;

// styled-components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const SignupButton = styled.TouchableOpacity`
  background-color: #6200ee;
  padding: 12px 24px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const SwitchLogin = styled.TouchableOpacity`
  align-items: center;
`;

const SwitchText = styled.Text`
  color: #6200ee;
  font-size: 14px;
`;
