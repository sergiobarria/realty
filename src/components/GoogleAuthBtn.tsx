import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Button, useToast } from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';

import { db } from '@/firebase.config';
import { useAuth } from '@/hooks/useAuth';

export default function GoogleAuthBtn() {
  const [error, setError] = React.useState<string>('');
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error]);

  async function registerWithGoogleHandler() {
    setError('');
    try {
      const response = await googleSignIn();

      const user = response.user;

      // Check if user is on db
      const docRef = doc(db, 'users', user.uid);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/', { replace: true });
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  }

  return (
    <Button
      leftIcon={<FcGoogle size='1.5rem' />}
      textColor='gray.500'
      onClick={registerWithGoogleHandler}
    >
      Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google
    </Button>
  );
}
