import React from 'react';
import { Alert, Linking } from 'react-native';
import styled from 'styled-components/native';

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

export default function ContactScreen() {
  const handleSubmit = () => {
    Alert.alert('Message envoyé', 'Nous vous répondrons bientôt !');
  };

  const handleOpenMail = () => {
    Linking.openURL('mailto:support@todolistapp.com');
  };

  return (
    <Container>
      <Title>Contact</Title>

      <Label>Nom</Label>
      <Input placeholder="Votre nom" />

      <Label>Email</Label>
      <Input placeholder="Votre email" keyboardType="email-address" />

      <Label>Message</Label>
      <Input
        placeholder="Votre message"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <Button onPress={handleSubmit}>
        <ButtonText>Envoyer</ButtonText>
      </Button>

      <Button onPress={handleOpenMail}>
        <ButtonText>Contacter le support</ButtonText>
      </Button>
    </Container>
  );
}
