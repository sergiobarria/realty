import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function GoogleAuthBtn(props: ButtonProps) {
  const { onClick, ...rest } = props;
  const { authActions } = useActions();
  const { isError, errorMessage, user } = useAppSelector((state) => state.auth);
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
  }

  return (
    <Button leftIcon={<FcGoogle size='1.5rem' />} onClick={registerWithGoogleHandler} {...rest}>
      Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google
    </Button>
  );
}
