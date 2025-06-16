import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { AppContext } from '../src/context/AppContext';
import auth from '@react-native-firebase/auth';
import { navigationRef } from '../src/App';

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn().mockResolvedValue({}),
    sendPasswordResetEmail: jest.fn().mockResolvedValue(),
  })),
}));

// Mock navigationRef
jest.mock('../App', () => ({
  navigationRef: {
    isReady: jest.fn().mockReturnValue(true),
    navigate: jest.fn(),
  },
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

describe('LoginScreen', () => {
  const mockLogin = jest.fn().mockResolvedValue({});
  const mockContext = {
    login: mockLogin,
    user: null,
  };

  it('affiche une erreur si les champs sont vides', async () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <LoginScreen />
      </AppContext.Provider>
    );
    fireEvent.press(getByText('Se connecter'));
    await waitFor(() => {
      expect(require('react-native').Alert.alert).toHaveBeenCalledWith(
        'Erreur',
        'Échec de la connexion'
      );
    });
  });

  it('navigue vers MainApp après connexion réussie', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AppContext.Provider value={mockContext}>
        <LoginScreen />
      </AppContext.Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password123');
    fireEvent.press(getByText('Se connecter'));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(navigationRef.navigate).toHaveBeenCalledWith('MainApp');
    });
  });
});