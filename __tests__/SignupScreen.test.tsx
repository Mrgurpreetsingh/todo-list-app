import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from '../src/screens/SignupScreen';
import { AppContext } from '../src/context/AppContext';

// Mock Firebase Auth
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: '123' } }),
  })),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

// Mock styled-components/native
jest.mock('styled-components/native', () => ({
  ...jest.requireActual('styled-components/native'),
  default: jest.fn((component) => component),
  ScrollView: jest.fn((component) => component),
  View: jest.fn((component) => component),
  Text: jest.fn((component) => component),
  TextInput: jest.fn((component) => component),
  Pressable: jest.fn((component) => component),
}));

// Mock react-native Alert and TurboModuleRegistry
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  get: jest.fn((name) => {
    if (name === 'DevMenu' || name === 'ReactNativeFeatureFlags') {
      return { show: jest.fn(), hide: jest.fn() };
    }
    return null;
  }),
  getEnforcing: jest.fn((name) => {
    if (name === 'DevMenu' || name === 'ReactNativeFeatureFlags') {
      return { show: jest.fn(), hide: jest.fn() };
    }
    return null;
  }),
}));

describe('SignupScreen', () => {
  const mockSignup = jest.fn().mockResolvedValue(undefined);
  const mockContext = {
    login: jest.fn(),
    signup: mockSignup,
    logout: jest.fn(),
    user: null,
  };

  it('affiche une erreur si les champs sont vides', async () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <SignupScreen />
      </AppContext.Provider>
    );
    fireEvent.press(getByText("S'inscrire"));
    await waitFor(() => {
      expect(require('react-native/Libraries/Alert/Alert').alert).toHaveBeenCalledWith(
        'Erreur',
        "Échec de l'inscription"
      );
    });
  });

  it('navigue vers MainApp après inscription réussie', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({
      navigate: mockNavigate,
    });

    const { getByPlaceholderText, getByText } = render(
      <AppContext.Provider value={mockContext}>
        <SignupScreen />
      </AppContext.Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirmer le mot de passe'), 'password123');
    fireEvent.press(getByText("S'inscrire"));
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('MainApp');
    });
  });
});
