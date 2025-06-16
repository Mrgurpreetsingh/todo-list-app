import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Task } from '../context/TasksContext';

type RootStackParamList = {
  MainApp: undefined;
  Login: undefined;
  Signup: undefined;
  TaskDetail: { taskId: string; task?: Task };
  AddTask: { taskId: string; task?: Task };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f2f2f2;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
`;

const Input = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  color: black;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: #FF4444;
  font-size: 12px;
  margin-bottom: 8px;
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

const LinkText = styled.Text`
  color: #4CAF50;
  text-align: center;
  margin-top: 16px;
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().min(6, 'Mot de passe trop court').required('Mot de passe requis'),
});

const LoginScreen: React.FC = () => {
  const context = useContext(AppContext);
  const navigation = useNavigation<NavigationProp>();
  const [lastResetTime, setLastResetTime] = useState(0);

  if (!context) {
    console.error('AppContext is undefined');
    return null;
  }

  const { login } = context;

  const handleResetPassword = async (email: string) => {
    const now = Date.now();
    if (now - lastResetTime < 30000) {
      Alert.alert('Erreur', 'Veuillez attendre 30 secondes avant de réessayer.');
      return;
    }
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer un email');
      return;
    }
    try {
      console.log('Envoi email de réinitialisation pour:', email);
      await auth().sendPasswordResetEmail(email.trim());
      console.log('Email de réinitialisation envoyé');
      setLastResetTime(now);
      Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
    } catch (error: any) {
      console.error('Erreur réinitialisation:', error.code, error.message);
      Alert.alert('Erreur', error.message || 'Échec de l\'envoi');
    }
  };

  return (
    <Container>
      <Title>Connexion</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log('Tentative de connexion avec email:', values.email);
            await login(values.email.trim(), values.password);
            console.log('Connexion réussie');
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainApp' }],
            });
          } catch (error: any) {
            console.error('Erreur connexion:', error.code, error.message);
            Alert.alert('Erreur', error.message || 'Échec de la connexion');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <Input
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
            <Input
              placeholder="Mot de passe"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              placeholderTextColor="#999"
            />
            {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}
            <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
              <ButtonText>Se connecter</ButtonText>
            </Button>
            <LinkText onPress={() => handleResetPassword(values.email)}>
              Mot de passe oublié ?
            </LinkText>
            <LinkText onPress={() => navigation.navigate('Signup')}>
              Pas de compte ? Inscrivez-vous
            </LinkText>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;
