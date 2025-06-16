Todolist App
Description
Application mobile de liste de tâches développée avec React Native. Permet aux utilisateurs de gérer des tâches localement avec AsyncStorage, de s'authentifier via Firebase Authentication, et d'envoyer des messages de contact stockés dans Firestore.
Fonctionnalités

Gestion des tâches : Ajout, modification, complétion, suppression de tâches.
Authentification : Connexion, inscription, réinitialisation de mot de passe avec timeout de 30s.
Formulaire de contact : Validation des entrées (email, champs requis, RGPD), stockage sécurisé dans Firestore avec timeout de 30s.
Navigation : Menu burger implémenté avec react-navigation/drawer.
Stockage local : Persistance des tâches avec AsyncStorage.

Stack Technique

Frontend : React Native, TypeScript, JSX
Backend : Firebase (Authentication, Firestore)
Navigation : @react-navigation/native, @react-navigation/drawer
Style : styled-components/native
Gestes : react-native-gesture-handler
Stockage local : @react-native-async-storage/async-storage
Tests : Jest, @testing-library/react-native
Environnement : Node.js, Android Studio

Outils

IDE : Visual Studio Code
Plugins VSCode : ESLint, Prettier, TypeScript, React Native Tools
Organisation : Trello
Versionnement : Git, GitHub

Sécurité

Validation des entrées :
Connexion/Inscription : Formik/Yup (email requis, format valide, mot de passe > 6 caractères, mots de passe correspondants).
Formulaire de contact : Regex pour email, champs obligatoires, consentement RGPD obligatoire.


Protection contre abus :
Timeout de 30s pour la réinitialisation de mot de passe (LoginScreen).
Timeout de 30s pour l'envoi de messages de contact (ContactScreen).
Protection contre soumissions multiples via gestion d'état local.


Firestore :
Règles :rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactMessages/{document=**} {
      allow read: if false;
      allow write: if request.auth != null
        && request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.message is string
        && request.resource.data.rgpdAccepted == true;
    }
  }
}


Validation des champs : name, email, message (chaînes), rgpdAccepted: true.


Protection XSS :
React Native rend des composants natifs, réduisant les risques XSS.
Sanitisation des entrées dans ContactScreen (suppression des balises HTML).
Isolation des styles avec styled-components.


Authentification : Tokens sécurisés via Firebase Authentication.
Vulnérabilités : 13 vulnérabilités modérées détectées par npm audit. Correction planifiée post-soutenance.

Installation

Cloner le dépôt :git clone https://github.com/Mrgurpreetsingh/todolistapp.git
cd todolistapp


Installer les dépendances :npm install


Configurer Firebase :
Ajouter google-services.json dans android/app.
Configurer .env avec les clés Firebase :FIREBASE_API_KEY=AIzaSyDllKXuSZFYWEZ2gegav73KFBmmhGMCzE8
FIREBASE_PROJECT_ID=todolistapp-635c9




Lancer le serveur Metro :npx react-native start --reset-cache


Lancer l'application Android :npx react-native run-android



Structure du Projet
TodolistApp/
├── android/
├── ios/
├── __tests__/
│   ├── LoginScreen.test.tsx
│   ├── SignupScreen.test.tsx
│   ├── ContactScreen.test.tsx
│   ├── TasksContext.test.tsx
├── src/
│   ├── components/
│   │   ├── CustomDrawerContent.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── ContactScreen.tsx
│   │   └── TasksScreen.tsx
│   ├── context/
│   │   ├── TasksContext.tsx
│   │   ├── AppContext.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   └── App.tsx
├── .env
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
├── README.md

Tests

Unitaires :npm test


Tests Jest implémentés pour :
TasksContext (ajout de tâches).
LoginScreen (connexion réussie, erreur si champs vides, corrigé pour TypeScript/ESLint).
SignupScreen (inscription réussie, erreur si champs vides).
ContactScreen (envoi de message réussi, erreur si champs vides).




Tests Postman (16/06/2025) :
Authentication :
Sign Up : Succès (HTTP 200, utilisateur créé avec nouveautest2@example.com).
Sign In : Succès (HTTP 200, idToken obtenu).
Reset Password : Succès (HTTP 200, email de réinitialisation envoyé).


Firestore :
Write Contact Message : Succès (HTTP 200, message ajouté à contactMessages).
Write Invalid Message : Échec (HTTP 403, règles Firestore respectées).
Read Contact Messages : Échec (HTTP 403, lecture interdite).




Manuels :
Tâches : Persistance vérifiée avec AsyncStorage.
Connexion : Validation email/mot de passe, timeout 30s.
Contact : Validation (email, RGPD), timeout 30s, sanitisation XSS.
Navigation : Menu burger fonctionnel, logs répétitifs corrigés dans CustomDrawerContent.tsx.
Gestes : TouchableOpacity remplacé par Pressable dans HomeScreen pour compatibilité avec react-native-gesture-handler.



Déploiement

Préparation d'un Android App Bundle (AAB) pour le Google Play Store.
Configuration de la signature dans android/app/build.gradle.
Déploiement des règles Firestore :firebase deploy --only firestore:rules



Prochaines Étapes

Corriger les 13 vulnérabilités modérées détectées par npm audit.
Optimiser les performances (temps de chargement des tâches, requêtes Firestore).
Implémenter un rate limiting côté serveur via Cloud Functions pour Firestore.

Remarques

CustomDrawerContent.tsx corrigé pour supprimer les logs répétitifs (Drawer routes).
Règles Firestore intermédiaires vérifiées via tests Postman.
TouchableOpacity remplacé par Pressable dans HomeScreen pour compatibilité avec react-native-gesture-handler.
Tests unitaires pour LoginScreen, SignupScreen, et ContactScreen implémentés et corrigés.
Projet fonctionnel sur Android, iOS non testé.

