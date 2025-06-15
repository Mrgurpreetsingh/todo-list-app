// Firebase Debug Utilities
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Configuration Firebase - valeurs extraites de votre google-services.json
const firebaseConfig = {
  apiKey: 'AIzaSyDllKXuSZFYWEZ2gegav73KFBmmhGMCzE8',
  authDomain: 'todolistapp-635c9.firebaseapp.com',
  projectId: 'todolistapp-635c9',
  storageBucket: 'todolistapp-635c9.firebasestorage.app',
  messagingSenderId: '662459608639',
  appId: '1:662459608639:android:6c49e2d759417790c7128a',
};

// Initialisation Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Interface pour les logs de débogage
interface DebugLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
}

class FirebaseDebugger {
  private logs: DebugLog[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.log('info', 'Firebase Debugger initialized');
  }

  private log(level: DebugLog['level'], message: string, data?: any): void {
    if (!this.isEnabled) {
        return;
    }
    const logEntry: DebugLog = {
      timestamp: new Date(),
      level,
      message,
      data,
    };

    this.logs.push(logEntry);

    // Affichage dans la console avec couleurs
    const style = this.getConsoleStyle(level);
    console.log(
      `%c[Firebase Debug ${level.toUpperCase()}] ${message}`,
      style,
      data || ''
    );
  }

  private getConsoleStyle(level: DebugLog['level']): string {
    switch (level) {
      case 'info':
        return 'color: #2196F3; font-weight: bold;';
      case 'warn':
        return 'color: #FF9800; font-weight: bold;';
      case 'error':
        return 'color: #F44336; font-weight: bold;';
      default:
        return 'color: #000; font-weight: bold;';
    }
  }

  // Test de connexion Firebase
  async testConnection(): Promise<boolean> {
    try {
      this.log('info', 'Testing Firebase connection...');

      // Test d'authentification
      const testAuth = getAuth();
      this.log('info', 'Auth instance created successfully', {
        currentUser: testAuth.currentUser?.uid || 'No user',
      });

      return true;
    } catch (error) {
      this.log('error', 'Firebase connection test failed', error);
      return false;
    }
  }

  // Test d'authentification avec email/mot de passe
  async testEmailAuth(email: string, password: string): Promise<boolean> {
    try {
      this.log('info', 'Testing email authentication...', { email });

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.log('info', 'Email authentication successful', {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      return true;
    } catch (error: any) {
      this.log('error', 'Email authentication failed', {
        code: error.code,
        message: error.message,
      });
      return false;
    }
  }

  // Test de création de compte
  async testCreateAccount(email: string, password: string): Promise<boolean> {
    try {
      this.log('info', 'Testing account creation...', { email });

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      this.log('info', 'Account creation successful', {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      return true;
    } catch (error: any) {
      this.log('error', 'Account creation failed', {
        code: error.code,
        message: error.message,
      });
      return false;
    }
  }

  // Test de déconnexion
  async testSignOut(): Promise<boolean> {
    try {
      this.log('info', 'Testing sign out...');

      await signOut(auth);
      this.log('info', 'Sign out successful');

      return true;
    } catch (error: any) {
      this.log('error', 'Sign out failed', {
        code: error.code,
        message: error.message,
      });
      return false;
    }
  }

  // Surveillance des changements d'état d'authentification
  startAuthStateMonitoring(): () => void {
    this.log('info', 'Starting auth state monitoring...');

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.log('info', 'User signed in', {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        });
      } else {
        this.log('info', 'User signed out');
      }
    });

    return unsubscribe;
  }

  // Diagnostic complet
  async runDiagnostics(): Promise<void> {
    this.log('info', '🔍 Starting Firebase diagnostics...');

    try {
      // Test de connexion
      const connectionOk = await this.testConnection();
      this.log(connectionOk ? 'info' : 'error', `Connection test: ${connectionOk ? 'PASSED' : 'FAILED'}`);

      // Informations sur l'application
      this.log('info', 'Firebase app info', {
        name: app.name,
        options: app.options,
      });

      // Informations sur l'authentification
      this.log('info', 'Auth info', {
        currentUser: auth.currentUser?.uid || 'No user',
        languageCode: auth.languageCode,
      });

      this.log('info', '✅ Diagnostics completed');
    } catch (error) {
      this.log('error', '❌ Diagnostics failed', error);
    }
  }

  // Obtenir tous les logs
  getLogs(): DebugLog[] {
    return [...this.logs];
  }

  // Nettoyer les logs
  clearLogs(): void {
    this.logs = [];
    this.log('info', 'Logs cleared');
  }

  // Activer/désactiver le débogage
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (enabled) {
      this.log('info', 'Firebase debugging enabled');
    }
  }

  // Exporter les logs en JSON
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Afficher un résumé des erreurs
  getErrorSummary(): { [key: string]: number } {
    const errorSummary: { [key: string]: number } = {};

    this.logs
      .filter(log => log.level === 'error')
      .forEach(log => {
        const errorCode = log.data?.code || 'unknown';
        errorSummary[errorCode] = (errorSummary[errorCode] || 0) + 1;
      });

    return errorSummary;
  }
}

// Instance globale du debugger
export const firebaseDebugger = new FirebaseDebugger();

// Fonctions utilitaires exportées
export const debugFirebase = {
  test: () => firebaseDebugger.runDiagnostics(),
  testAuth: (email: string, password: string) => firebaseDebugger.testEmailAuth(email, password),
  createAccount: (email: string, password: string) => firebaseDebugger.testCreateAccount(email, password),
  signOut: () => firebaseDebugger.testSignOut(),
  startMonitoring: () => firebaseDebugger.startAuthStateMonitoring(),
  getLogs: () => firebaseDebugger.getLogs(),
  clearLogs: () => firebaseDebugger.clearLogs(),
  exportLogs: () => firebaseDebugger.exportLogs(),
  getErrors: () => firebaseDebugger.getErrorSummary(),
};

// Export par défaut
export default firebaseDebugger;
