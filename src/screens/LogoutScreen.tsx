import React, { useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const LogoutScreen: React.FC = () => {
  const context = useContext(AppContext);
  const navigation = useNavigation<NavigationProp>();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (!context) {
      console.error('AppContext is undefined');
      setShowAlert(false);
      return;
    }

    const { logout, user } = context;

    if (!showAlert) {
      return;
    }

    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Non',
          style: 'cancel',
          onPress: () => {
            setShowAlert(false);
            navigation.navigate('Home');
          },
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              console.log('Tentative de déconnexion, current user:', user?.uid || 'none');
              if (!user) {
                console.warn('Aucun utilisateur connecté');
                setShowAlert(false);
                // Don't navigate here, let auth state handle it
                return;
              }

              await logout();
              console.log('Déconnexion réussie');
              setShowAlert(false);
            } catch (error: any) {
              console.error('Erreur déconnexion:', error.message || error);
              Alert.alert('Erreur', error.message || 'Échec de la déconnexion');
              setShowAlert(false);
              navigation.navigate('Home');
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, [context, navigation, showAlert]);

  if (!context) {
    return <View />;
  }

  return <View />;
};

export default LogoutScreen;
