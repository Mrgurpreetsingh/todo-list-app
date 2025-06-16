import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
  color: #333;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: #FF4444;
  font-size: 12px;
  margin-bottom: 8px;
`;

const SignupButton = styled.Pressable`
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

const SwitchLogin = styled.Pressable`
  align-items: center;
`;

const SwitchText = styled.Text`
  color: #4CAF50;
  font-size: 14px;
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
  password: Yup.string().min(6, 'Mot de passe trop court').required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation requise'),
});

const SignupScreen: React.FC = () => {
  const { signup } = useContext(AppContext)!;
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <Title>Inscription</Title>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            console.log('Tentative d\'inscription avec email:', values.email);
            await signup(values.email.trim(), values.password);
            console.log('Inscription réussie');
            Alert.alert('Succès', 'Compte créé ! Veuillez vous connecter.');
            resetForm();
            navigation.navigate('Login');
          } catch (error: any) {
            console.error('Erreur inscription:', error.code, error.message);
            Alert.alert('Erreur', error.message || 'Échec de l\'inscription');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <Label>Email</Label>
            <Input
              placeholder="Votre email"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            {touched.email && errors.email && <ErrorText>{errors.email}</ErrorText>}
            <Label>Mot de passe</Label>
            <Input
              placeholder="Votre mot de passe"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              placeholderTextColor="#999"
            />
            {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}
            <Label>Confirmer le mot de passe</Label>
            <Input
              placeholder="Confirmez votre mot de passe"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry
              placeholderTextColor="#999"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <ErrorText>{errors.confirmPassword}</ErrorText>
            )}
            <SignupButton onPress={() => handleSubmit()} disabled={isSubmitting}>
              <ButtonText>S'inscrire</ButtonText>
            </SignupButton>
            <SwitchLogin onPress={() => navigation.navigate('Login')}>
              <SwitchText>Déjà un compte ? Se connecter</SwitchText>
            </SwitchLogin>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SignupScreen;

