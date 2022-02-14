import * as React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Divider, Flex, VStack, Text, Link } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FaUserAlt } from 'react-icons/fa';
import { Formik, Form } from 'formik';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';
import GoogleAuthBtn from '@/components/GoogleAuthBtn';
import { signUpSchema } from '@/utils/formSchemas';

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const { authActions } = useActions();
  const { isError, errorMessage, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues: SignUpFormInputs = {
    name: '',
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
        description: 'You have been successfully logged back!',
        status: 'success',
      });
    }
  }, [user]);

  const handleSignUp = (data: SignUpFormInputs) => {
    authActions.register(data);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSignUp} validationSchema={signUpSchema}>
      <Form>
        <VStack spacing={6} align='stretch'>
          <InputField
            name='name'
            type='text'
            label='Your Name'
            leftElement={<FaUserAlt />}
            placeholder='Enter your name...'
          />

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
            placeholder='Enter your password...'
          />
          <SubmitButton fontSize='lg'>Sign Up</SubmitButton>
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
