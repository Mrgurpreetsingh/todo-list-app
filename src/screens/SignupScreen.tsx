import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { AppContext } from '../context/AppContext';

const SignupScreen = ({ navigation }: any) => {
  const { signup } = useContext(AppContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signup(email, password);
      navigation.replace('MainApp');
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <Container>
      <Title>Inscription</Title>
      <Label>Email</Label>
      <Input
        placeholder="Votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <Label>Mot de passe</Label>
      <Input
        placeholder="Votre mot de passe"
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

const Container = styled.ScrollView`
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

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: #666;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-family: System; /* Ajout pour éviter les polices personnalisées */
`;

const SignupButton = styled.TouchableOpacity`
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

const SwitchLogin = styled.TouchableOpacity`
  align-items: center;
`;

const SwitchText = styled.Text`
  color: #4CAF50;
  font-size: 14px;
`;
