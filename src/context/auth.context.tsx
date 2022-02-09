import React, { createContext, ReactNode } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase.config';

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('Auth', currentUser);

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function passwordReset(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // const value = React.useMemo(() => ({ user, signUp, login, logout }), []);
  const value = { user, signUp, login, logout, passwordReset, googleSignIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
