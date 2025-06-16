import React, { useState } from 'react';
import { Alert, Linking, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');
const isMobile = width < 600;

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
  ${isMobile ? `
    align-content: center;
  ` : `
    padding-horizontal: 20%;
  `}
`;

const FormContainer = styled.View`
  ${isMobile ? `
    width: 100%;
  ` : `
    width: 60%;
    align-self: center;
  `}
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
  text-align: center;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: #000;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  color: #000;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Checkbox = styled.Pressable<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.checked ? '#4CAF50' : 'white')};
`;

const CheckMark = styled.Text`
  color: white;
  font-size: 12px;
`;

const CheckboxLabel = styled.Text`
  font-size: 14px;
  color: #000;
  flex: 1;
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

const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rgpdAccepted, setRgpdAccepted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const sanitizeInput = (input: string) => {
    return input.replace(/<[^>]*>/g, ''); // Supprime les balises HTML
  };

  const handleSubmit = async () => {
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      Alert.alert('Erreur', 'Veuillez attendre 30 secondes avant de renvoyer un message.');
      return;
    }

    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedMessage = sanitizeInput(message.trim());

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (!emailRegex.test(sanitizedEmail)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return;
    }

    if (!rgpdAccepted) {
      Alert.alert('Erreur', 'Veuillez accepter les conditions RGPD.');
      return;
    }

    try {
      console.log('Envoi du message à Firestore:', {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        rgpdAccepted,
      });
      await firestore()
        .collection('contactMessages')
        .add({
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage,
          rgpdAccepted,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      console.log('Message enregistré dans Firestore');
      setLastSubmitTime(now);
      Alert.alert('Message envoyé', 'Nous vous répondrons bientôt !');
      setName('');
      setEmail('');
      setMessage('');
      setRgpdAccepted(false);
    } catch (error: any) {
      console.error('Erreur Firestore:', error.message || error);
      Alert.alert('Erreur', 'Échec de l\'envoi du message.');
    }
  };

  const handleOpenMail = () => {
    Linking.openURL('mailto:support@todolistapp.com');
  };

  return (
    <Container>
      <FormContainer>
        <Title>Contactez-nous</Title>
        <Label>Nom</Label>
        <Input
          placeholder="Votre nom"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
        <Label>Email</Label>
        <Input
          placeholder="Votre email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />
        <Label>Message</Label>
        <Input
          placeholder="Votre message"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#999"
        />
        <CheckboxContainer>
          <Checkbox
            checked={rgpdAccepted}
            onPress={() => setRgpdAccepted(!rgpdAccepted)}
          >
            {rgpdAccepted && <CheckMark>✓</CheckMark>}
          </Checkbox>
          <CheckboxLabel>
            J'accepte que mes données soient traitées conformément au RGPD et à la politique de confidentialité.
          </CheckboxLabel>
        </CheckboxContainer>
        <Button onPress={handleSubmit}>
          <ButtonText>Envoyer</ButtonText>
        </Button>
        <Button onPress={handleOpenMail}>
          <ButtonText>Contacter le support</ButtonText>
        </Button>
      </FormContainer>
    </Container>
  );
};

export default ContactScreen;
