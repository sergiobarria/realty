import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9Xx4Bodjm0oDnk6i7ejezdGe_TjSeR4Q',
  authDomain: 'realty-48fbc.firebaseapp.com',
  projectId: 'realty-48fbc',
  storageBucket: 'realty-48fbc.appspot.com',
  messagingSenderId: '46315857468',
  appId: '1:46315857468:web:de4ba50f9e9b91af2dc539',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
