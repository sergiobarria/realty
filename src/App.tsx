import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';

import theme from '@/theme';

import Layout from '@/components/Layout';
import Routes from '@/router';

import { AuthContextProvider } from '@/context/auth.context';
import { auth } from './firebase.config';

import { useAppDispatch } from './hooks/useAppDispatch';
import { authActions } from './store/auth/auth.slice';

export default function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user = {
          uid: currentUser?.uid,
          name: currentUser?.displayName!,
          email: currentUser?.email!,
        };
        dispatch(authActions.saveCurrentUser(user));
      }
    });

    return () => unsubscribe();
  });

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Layout>
            <Routes />
          </Layout>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}
