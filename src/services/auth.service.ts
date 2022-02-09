import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

import { User } from './auth.service.types';

export async function signUpService(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  updateProfile(auth.currentUser!, {
    displayName: name,
  });

  const formData = { name, email } as User;
  formData.timestamp = serverTimestamp();

  await setDoc(doc(db, 'users', user.uid), formData);

  const registeredUser = {
    uid: user.uid!,
    email: user.email!,
    name: user.displayName!,
  };

  return registeredUser;
}

export async function loginService(
  email: string,
  password: string
): Promise<User> {
  const auth = getAuth();

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = {
    uid: userCredential.user.uid!,
    email: userCredential.user.email!,
    name: userCredential.user.displayName!,
  };

  return user;
}

export function logoutService() {
  const auth = getAuth();

  auth.signOut();
}
