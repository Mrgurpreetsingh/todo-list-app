import React, { useState } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import firebaseDebugger from './utils/firebaseDebug';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function TestFirebase() {
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostic = async () => {
    setIsRunning(true);
    console.log('🔍 Lancement du diagnostic Firebase...');

    try {
      // Diagnostic complet
      console.log('🔍 Lancement du diagnostic Firebase...');
      await firebaseDebugger.runDiagnostics();

      // Test spécifique de votre compte
      console.log('🧪 Test de connexion spécifique...');
      await firebaseDebugger.testEmailAuth(
        'test22@mail.com',
        'Test123'  // REMPLACEZ par votre vrai mot de passe
      );

      Alert.alert(
        'Diagnostic terminé',
        'Vérifiez la console pour les résultats détaillés'
      );
    } catch (error) {
      console.error('❌ Erreur lors du diagnostic:', error);
      Alert.alert('Erreur', 'Erreur lors du diagnostic');
    } finally {
      setIsRunning(false);
    }
  };
  const testFirestore = async () => {
  try {
    await firestore().collection('test').add({
      message: 'Hello Firebase!',
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    console.log('✅ Document ajouté à Firestore');
  } catch (error) {
    console.log('❌ Erreur Firestore:', error);
  }
  const signInAnonymously = async () => {
  try {
    await auth().signInAnonymously();
    console.log('✅ Connexion anonyme réussie');
  } catch (error) {
    console.log('❌ Erreur auth:', error);
  }
};
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Test Firebase Debug</Text>
      <Text style={styles.subtitle}>
        Appuyez sur le bouton et regardez la console
      </Text>
      <Button
        title={isRunning ? 'Diagnostic en cours...' : '🚀 Lancer le diagnostic'}
        onPress={runDiagnostic}
        disabled={isRunning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
});
