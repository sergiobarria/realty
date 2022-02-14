import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';

export interface UserInfo {
  name?: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: UserInfo, thunkAPI) => {
    try {
      let registeredUser;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential && auth.currentUser) {
        updateProfile(auth?.currentUser, {
          displayName: name,
        });

        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          timestamp: serverTimestamp(),
        });

        registeredUser = {
          uid: userCredential.user.uid,
          name: userCredential.user.displayName!,
          email: userCredential.user.email!,
        };

        return registeredUser;
      }
    } catch (error: any) {
      console.error('Error', error.message);
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserInfo, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const { user } = userCredential;

      if (user) {
        return {
          uid: user.uid,
          name: user.displayName!,
          email: user.email!,
        };
      }
    } catch (error: any) {
      console.error('Error', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);

  return undefined;
});

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Error', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleSignIn = createAsyncThunk('auth/googleSignIn', async (_, thunkAPI) => {
  try {
    const googleAuthProvider = new GoogleAuthProvider();

    const userCredential = await signInWithPopup(auth, googleAuthProvider);

    const { user } = userCredential;

    // check if user is on db
    const docRef = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      const newUser = {
        name: user.displayName!,
        email: user.email!,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), newUser);

      return newUser;
    }
  } catch (error: any) {
    console.error('Error', error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
