import * as React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { Button, Divider, useToast, Flex } from '@chakra-ui/react';
import { Container, Heading, VStack, Text, Link } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUserAlt } from 'react-icons/fa';

import { useAuth } from '@/hooks/useAuth';
import { auth, db } from '@/firebase.config';
import GoogleAuthBtn from '@/components/GoogleAuthBtn';

import { registerSchema } from '@/utils/formSchemas';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const { signUp, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      reset();
    }
  }, [error]);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function submitHandler(formData: RegisterFormInputs) {
    const { name, email, password } = formData;

    setError('');
    try {
      const userCredential = await signUp(email, password);

      if (userCredential.user && auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });

        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          timestamp: serverTimestamp(),
        });
      }
      reset();
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
      setError('Those credentials are already in use.');
    }
  }

  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='brand.primary' mb='2rem'>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(submitHandler)}>
        <VStack spacing='24px' align='stretch'>
          {/* Name */}
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel htmlFor='name' fontSize='sm'>
              Name
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<FaUserAlt style={{ color: '#CBD5E0' }} />}
              />
              <Input
                type='text'
                placeholder='Enter your email...'
                {...register('name')}
              />
            </InputGroup>
            {errors?.name && (
              <FormErrorMessage>{errors?.name.message}</FormErrorMessage>
            )}
          </FormControl>

          {/* Email */}
          <FormControl isInvalid={!!errors?.email}>
            <FormLabel htmlFor='email' fontSize='sm'>
              Email
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='gray.300' />}
              />
              <Input
                type='email'
                placeholder='Enter your email...'
                {...register('email')}
              />
            </InputGroup>
            {errors?.email && (
              <FormErrorMessage>{errors?.email.message}</FormErrorMessage>
            )}
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={!!errors?.password}>
            <FormLabel htmlFor='password' fontSize='sm'>
              Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.300' />}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password...'
                {...register('password')}
              />
              <InputRightElement>
                <Button bg='transparent' _hover={{ bg: 'transparent' }}>
                  {showPassword ? (
                    <ViewOffIcon
                      color='gray.300'
                      onClick={handleShowPassword}
                      _hover={{ color: 'gray.600' }}
                    />
                  ) : (
                    <ViewIcon
                      color='gray.300'
                      onClick={handleShowPassword}
                      _hover={{ color: 'gray.600' }}
                    />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors?.password && (
              <FormErrorMessage>{errors?.password.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            type='submit'
            bg='brand.primary'
            textColor='white'
            fontSize='lg'
            isLoading={isSubmitting}
            _hover={{ textColor: 'brand.primary', backgroundColor: 'gray.300' }}
          >
            Sign Up
          </Button>

          <Flex justifyContent='flex-end'>
            <Button
              variant='unstyled'
              textColor='brand.accent'
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password
            </Button>
          </Flex>

          <Divider />

          <GoogleAuthBtn />
        </VStack>
      </form>
      <Text mt='6'>
        Already registered?{' '}
        <Link
          as={RouterLink}
          to='/sign-in'
          textColor='brand.primary'
          fontWeight='600'
          _hover={{ textColor: 'brand.accent' }}
        >
          Sign In
        </Link>{' '}
        instead.
      </Text>
    </Container>
  );
}
