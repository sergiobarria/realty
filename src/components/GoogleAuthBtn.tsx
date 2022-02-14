import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';

import { db } from '@/firebase.config';
import { useAuth } from '@/hooks/useAuth';

export default function GoogleAuthBtn(props: ButtonProps) {
  const { onClick, ...rest } = props;
  const { authActions } = useActions();
  const { isError, errorMessage, user } = useAppSelector((state) => state.auth);
  // const [error, setError] = React.useState<string>('');
  // const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  React.useEffect(() => {
    if (isError) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: errorMessage,
        status: 'error',
      });
    }
  }, [isError]);

  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
      toast({
        title: `Welcome Back, ${user.name}`,
        description: 'You have been successfully loggin!',
        status: 'success',
      });
    }
  }, [user]);

  function registerWithGoogleHandler() {
    authActions.googleSignIn();

    // setError('');
    // try {
    //   const response = await googleSignIn();

    //   const user = response.user;

    //   // Check if user is on db
    //   const docRef = doc(db, 'users', user.uid);
    //   const docSnapshot = await getDoc(docRef);

    //   if (!docSnapshot.exists()) {
    //     await setDoc(doc(db, 'users', user.uid), {
    //       name: user.displayName,
    //       email: user.email,
    //       timestamp: serverTimestamp(),
    //     });
    //   }
    //   navigate('/', { replace: true });
    // } catch (error) {
    //   setError('Something went wrong. Please try again later.');
    // }
  }

  return (
    <Button leftIcon={<FcGoogle size='1.5rem' />} onClick={registerWithGoogleHandler} {...rest}>
      Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google
    </Button>
  );
}
