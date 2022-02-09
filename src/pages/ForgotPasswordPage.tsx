import React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Container, Heading } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

import { useAuth } from '@/hooks/useAuth';
import { resetPasswordSchema } from '@/utils/formSchemas';

export default function ForgotPasswordPage() {
  const [error, setError] = React.useState<string>('');
  const { passwordReset } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({
    mode: 'onBlur',
    resolver: yupResolver(resetPasswordSchema),
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

  async function resetPasswordHandler(formData: { email: string }) {
    const { email } = formData;

    try {
      await passwordReset(email);
      toast({
        title: 'Email sent!',
        description:
          'An email was sent to your registered email, follow the instructions to reset your password',
        status: 'success',
        // duration: 5000,
        // isClosable: true,
      });
    } catch (error) {
      setError(
        'There was an error sending the reset email, please try again later.'
      );
    }
    reset();
  }

  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='brand.primary' mb='2rem'>
        Reset Password
      </Heading>
      <form onSubmit={handleSubmit(resetPasswordHandler)}>
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
                type='email'
                placeholder='Enter your email...'
                {...register('email')}
              />
            </InputGroup>
            {errors?.email && (
              <FormErrorMessage>{errors?.email.message}</FormErrorMessage>
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
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
