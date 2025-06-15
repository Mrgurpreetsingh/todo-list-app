import React, { createContext, useState, useEffect, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AppContextType = {
  user: FirebaseAuthTypes.User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      throw new Error(error.message || 'Échec de la connexion');
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      throw new Error(error.message || 'Échec de l\'inscription');
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error: any) {
      throw new Error(error.message || 'Échec de la déconnexion');
    }
  };

  return (
    <AppContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AppContext.Provider>
  );
};
