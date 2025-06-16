Todolist App
Description
Application mobile de liste de tâches développée avec React Native. Permet aux utilisateurs de gérer des tâches, de s'authentifier via Firebase, et d'envoyer des messages de contact stockés dans Firestore.
Fonctionnalités

Ajout, modification, et suppression de tâches.
Authentification (connexion, inscription, réinitialisation de mot de passe).
Formulaire de contact avec stockage Firestore.
Menu burger pour la navigation.
Stockage local des tâches avec AsyncStorage.

Stack Technique

Frontend : React Native, TypeScript, JSX
Backend : Firebase (Authentication, Firestore Enterprise avec compatibilité MongoDB)
Navigation : @react-navigation/native
Style : styled-components/native
Gestes : react-native-gesture-handler
Stockage local : AsyncStorage
Tests : Jest, @testing-library/react-native
Environnement : Node.js, Android Studio

Outils

IDE : VSCode
Plugins VSCode : ESLint, Prettier, TypeScript, React Native Tools
Organisation : Trello
Versionnement : Git, GitHub

Sécurité

Validation des entrées (regex email, champs obligatoires dans ContactScreen et LoginScreen).
Tokens Firebase gérés via @react-native-firebase/auth.
Règles Firestore restrictives (allow write: if request.auth != null).
Protection contre XSS via styled-components.

Installation
git clone https://github.com/<ton-username>/todolistapp.git
cd todolistapp
npm install
npx react-native run-android

Structure du projet
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── screens/
│   ├── context/
│   ├── __tests__/
│   └── App.tsx
├── .env
├── .gitignore
├── app.json
├── package.json
├── README.md

Tests
npm test

Déploiement

Préparation d'un AAB pour Google Play Store.
Configuration de la signature dans android/app/build.gradle.

