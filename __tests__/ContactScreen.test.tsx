import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ContactScreen from '../src/screens/ContactScreen';
import { AppContext } from '../src/context/AppContext';
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

// Mock styled-components/native completely
jest.mock('styled-components/native', () => {
  const ReactLibrary = require('react');
  return {
    __esModule: true,
    default: (component: any) => component,
    ScrollView: ReactLibrary.forwardRef((props: any, ref: any) =>
      ReactLibrary.createElement('ScrollView', { ...props, ref })
    ),
    View: ReactLibrary.forwardRef((props: any, ref: any) =>
      ReactLibrary.createElement('View', { ...props, ref })
    ),
    Text: ReactLibrary.forwardRef((props: any, ref: any) =>
      ReactLibrary.createElement('Text', { ...props, ref })
    ),
    TextInput: ReactLibrary.forwardRef((props: any, ref: any) =>
      ReactLibrary.createElement('TextInput', { ...props, ref })
    ),
    Pressable: ReactLibrary.forwardRef((props: any, ref: any) =>
      ReactLibrary.createElement('Pressable', { ...props, ref })
    ),
    TouchableOpacity: ReactLibrary.forwardRef((props: any, ref: any) =>
      ReactLibrary.createElement('TouchableOpacity', { ...props, ref })
    ),
  };
});

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

describe('ContactScreen', () => {
  const mockContext = {
    login: jest.fn(),
    signup: jest.fn(),
    logout: jest.fn(),
    user: {
      uid: '123',
      displayName: null,
      email: 'test@example.com',
      emailVerified: false,
      isAnonymous: false,
      photoURL: null,
      providerData: [],
      metadata: { creationTime: '', lastSignInTime: '' },
      providerId: '',
      refreshToken: '',
      tenantId: null,
      phoneNumber: null,
      multiFactor: {
        enrolledFactors: [],
        enroll: jest.fn(),
        unenroll: jest.fn(),
      },
      delete: jest.fn(),
      getIdToken: jest.fn().mockResolvedValue('token'),
      getIdTokenResult: jest.fn().mockResolvedValue({ token: 'token' }),
      reload: jest.fn(),
      toJSON: jest.fn(),
      linkWithCredential: jest.fn(),
      linkWithPopup: jest.fn(),
      linkWithRedirect: jest.fn(),
      reauthenticateWithCredential: jest.fn(),
      reauthenticateWithPopup: jest.fn(),
      reauthenticateWithRedirect: jest.fn(),
      reauthenticateWithProvider: jest.fn(),
      sendEmailVerification: jest.fn(),
      unlink: jest.fn(),
      updateEmail: jest.fn(),
      updatePassword: jest.fn(),
      updatePhoneNumber: jest.fn(),
      updateProfile: jest.fn(),
      verifyBeforeUpdateEmail: jest.fn(),
    },
  };

  it('affiche une erreur si les champs sont vides', async () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <ContactScreen />
      </AppContext.Provider>
    );
    fireEvent.press(getByText('Envoyer'));
    await waitFor(() => {
      expect(require('react-native/Libraries/Alert/Alert').alert).toHaveBeenCalledWith(
        'Erreur',
        'Veuillez remplir tous les champs.'
      );
    });
  });

  it('envoie un message si le formulaire est valide', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AppContext.Provider value={mockContext}>
        <ContactScreen />
      </AppContext.Provider>
    );
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
      expect(require('react-native/Libraries/Alert/Alert').alert).toHaveBeenCalledWith(
        'Message envoyé',
        'Nous vous répondrons bientôt !'
      );
    });
  });
});
