import * as React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { Button, Divider, useToast, Flex } from '@chakra-ui/react';
import { Container, Heading, VStack, Text, Link } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon } from '@chakra-ui/icons';

import { useAuth } from '@/hooks/useAuth';
import GoogleAuthBtn from '@/components/GoogleAuthBtn';

import { signInFormSchema } from '@/utils/formSchemas';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(signInFormSchema),
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: 'No user found with those credentials. Please try again.',
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

  async function submitHandler(formData: LoginFormInputs) {
    const { email, password } = formData;

    setError('');
    try {
      await login(email, password);
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
        Sign In
      </Heading>
      <form onSubmit={handleSubmit(submitHandler)}>
        <VStack spacing='24px' align='stretch'>
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
                id='email'
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
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password...'
                {...register('password')}
              />
              <InputRightElement>
                <Button bg='transparent' _hover={{ bg: 'transparent' }}>
                  <ViewIcon
                    color='gray.300'
                    onClick={handleShowPassword}
                    _hover={{ color: 'gray.600' }}
                  />
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
            _hover={{
              textColor: 'brand.primary',
              backgroundColor: 'gray.300',
            }}
          >
            Sign In
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
        Don't have an account yet?{' '}
        <Link
          as={RouterLink}
          to='/sign-up'
          textColor='brand.primary'
          fontWeight='600'
          _hover={{ textColor: 'brand.accent' }}
        >
          Sign Up
        </Link>{' '}
        instead.
      </Text>
    </Container>
  );
}
