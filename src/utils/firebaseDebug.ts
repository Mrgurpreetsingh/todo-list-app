// utils/firebaseDebug.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firebaseDebugger = {
  async runDiagnostics() {
    console.log('🔍 === DIAGNOSTIC FIREBASE REACT NATIVE ===');
    
    try {
      // 1. Vérification des modules
      console.log('📦 Modules Firebase:');
      console.log('  - Auth module:', !!auth);
      console.log('  - Firestore module:', !!firestore);
      
      // 2. État de l'authentification
      console.log('\n👤 Authentification:');
      const currentUser = auth().currentUser;
      if (currentUser) {
        console.log('  - Utilisateur connecté:', currentUser.email);
        console.log('  - UID:', currentUser.uid);
      } else {
        console.log('  - Aucun utilisateur connecté');
      }
      
      // 3. Test de connexion Firestore
      console.log('\n💾 Test Firestore:');
      const testCollection = firestore().collection('_diagnostics');
      const testDoc = testCollection.doc('test_' + Date.now());
      
      // Écriture
      await testDoc.set({
        message: 'Test de diagnostic',
        timestamp: firestore.FieldValue.serverTimestamp(),
        platform: 'react-native'
      });
      console.log('  - ✅ Écriture réussie');
      
      // Lecture
      const docSnapshot = await testDoc.get();
      if (docSnapshot.exists) {
        console.log('  - ✅ Lecture réussie');
        console.log('  - Données:', docSnapshot.data());
      }
      
      // Nettoyage
      await testDoc.delete();
      console.log('  - ✅ Suppression réussie');
      
      // 4. Test des règles de sécurité
      console.log('\n🔒 Test des permissions:');
      try {
        const publicTest = await firestore().collection('public').limit(1).get();
        console.log('  - ✅ Lecture collection publique OK');
      } catch (permError: any) {
        console.log('  - ⚠️ Erreur de permission:', permError.message);
      }
      
      console.log('\n🎉 === DIAGNOSTIC TERMINÉ ===');
      return {
        success: true,
        authAvailable: !!auth,
        firestoreAvailable: !!firestore,
        userConnected: !!currentUser,
        connectionTest: true
      };
      
    } catch (error: any) {
      console.error('\n❌ ERREUR DIAGNOSTIC:', error);
      console.error('Code:', error.code);
      console.error('Message:', error.message);
      
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },
  
  // Fonction pour tester l'auth
  async testAuth() {
    console.log('🔐 Test d\'authentification...');
    try {
      // Test de connexion anonyme
      const userCredential = await auth().signInAnonymously();
      console.log('✅ Connexion anonyme réussie:', userCredential.user.uid);
      
      // Déconnexion
      await auth().signOut();
      console.log('✅ Déconnexion réussie');
      
      return true;
    } catch (error: any) {
      console.error('❌ Erreur test auth:', error);
      return false;
    }
  },

  // Fonction pour tester l'auth avec email
  async testEmailAuth() {
    console.log('📧 Test d\'authentification email...');
    try {
      const testEmail = 'test@example.com';
      const testPassword = 'testpassword123';
      
      console.log('Tentative de création de compte...');
      // Essayer de créer un compte de test
      const userCredential = await auth().createUserWithEmailAndPassword(testEmail, testPassword);
      console.log('✅ Compte créé:', userCredential.user.email);
      
      // Déconnexion
      await auth().signOut();
      console.log('✅ Déconnexion réussie');
      
      // Reconnexion
      console.log('Tentative de connexion...');
      const loginCredential = await auth().signInWithEmailAndPassword(testEmail, testPassword);
      console.log('✅ Connexion réussie:', loginCredential.user.email);
      
      // Nettoyage - supprimer le compte de test
      await loginCredential.user.delete();
      console.log('✅ Compte de test supprimé');
      
      return true;
    } catch (error: any) {
      console.error('❌ Erreur test email auth:', error.message);
      
      // Si l'utilisateur existe déjà, essayer de se connecter
      if (error.code === 'auth/email-already-in-use') {
        try {
          console.log('Utilisateur existe, tentative de connexion...');
          await auth().signInWithEmailAndPassword('test@example.com', 'testpassword123');
          console.log('✅ Connexion réussie avec compte existant');
          await auth().signOut();
          return true;
        } catch (loginError: any) {
          console.error('❌ Erreur de connexion:', loginError.message);
        }
      }
      
      return false;
    }
  }
};

export default firebaseDebugger;