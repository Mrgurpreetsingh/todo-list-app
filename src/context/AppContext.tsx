import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

type AppContextType = {
  user: FirebaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const authInstance = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, [authInstance]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(authInstance, email, password);
  };

  const logout = async () => {
    await signOut(authInstance);
  };

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

