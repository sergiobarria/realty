import * as React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Divider, Flex, Link, useToast, VStack, Text } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import GoogleAuthBtn from './GoogleAuthBtn';

import { loginFormSchema } from '@/utils/formSchemas';

interface SignInFormInputs {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { authActions } = useActions();
  const { isError, errorMessage, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues: SignInFormInputs = {
    email: '',
    password: '',
  };

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

  const handleLogin = (data: SignInFormInputs) => {
    authActions.login(data);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={loginFormSchema}>
      <Form>
        <VStack spacing={6} align='stretch'>
          <InputField
            name='email'
            type='email'
            label='Your Email'
            leftElement={<EmailIcon />}
            placeholder='Enter your email...'
          />

          <InputField
            name='password'
            type='password'
            label='Your Password'
            leftElement={<LockIcon />}
            placeholder='Enter your password'
          />

          <SubmitButton>Sign In</SubmitButton>
        </VStack>

        <Flex justifyContent='flex-end'>
          <Button
            variant='unstyled'
            fontWeight='medium'
            textColor='gray.600'
            _hover={{ textColor: 'primary' }}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password
          </Button>
        </Flex>
        <Divider mb={6} />
        <GoogleAuthBtn w='full' textColor='gray.600' fontWeight='medium' />

        <Text mt='6' textColor='gray.600' fontWeight='medium'>
          Don't have an account yet?{' '}
          <Link
            as={RouterLink}
            to='/sign-up'
            textColor='primary'
            fontWeight='600'
            _hover={{ textColor: 'accent' }}
          >
            Sign Up
          </Link>{' '}
          instead.
        </Text>
      </Form>
    </Formik>
  );
}
