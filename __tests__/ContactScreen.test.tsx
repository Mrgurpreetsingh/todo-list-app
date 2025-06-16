import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ContactScreen from '../src/screens/ContactScreen';
import firestore from '@react-native-firebase/firestore';

// Mock Firestore
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue({}),
    })),
    FieldValue: {
      serverTimestamp: jest.fn(),
    },
  })),
}));

// Mock Alert
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');
  return {
    ...ActualReactNative,
    Alert: {
      alert: jest.fn(),
    },
  };
});

describe('ContactScreen', () => {
  it('affiche une erreur si les champs sont vides', async () => {
    const { getByText } = render(<ContactScreen />);
    fireEvent.press(getByText('Envoyer'));
    await waitFor(() => {
      expect(require('react-native').Alert.alert).toHaveBeenCalledWith(
        'Erreur',
        'Veuillez remplir tous les champs.'
      );
    });
  });

  it('envoie un message si le formulaire est valide', async () => {
    const { getByPlaceholderText, getByText } = render(<ContactScreen />);
    fireEvent.changeText(getByPlaceholderText('Votre nom'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Votre email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Votre message'), 'Bonjour');
    fireEvent.press(getByText(/J'accepte/));
    fireEvent.press(getByText('Envoyer'));
    await waitFor(() => {
      expect(firestore().collection('contactMessages').add).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Bonjour',
        rgpdAccepted: true,
        timestamp: expect.anything(),
      });
      expect(require('react-native').Alert.alert).toHaveBeenCalledWith(
        'Message envoyé',
        'Nous vous répondrons bientôt !'
      );
    });
  });
});
