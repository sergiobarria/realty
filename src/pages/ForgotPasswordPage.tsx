import React from 'react';

import { useNavigate } from 'react-router-dom';
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

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import { resetPasswordSchema } from '@/utils/formSchemas';
import CustomButton from '@/components/CustomButton';

export default function ForgotPasswordPage() {
  const { authActions } = useActions();
  const { isError, errorMessage } = useAppSelector((state) => state.auth);
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
    if (isError) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: errorMessage,
        status: 'error',
      });
    }
  }, [isError]);

  function resetPasswordHandler(formData: { email: string }) {
    const { email } = formData;

    authActions.resetPassword(email);

    toast({
      title: 'Email sent!',
      description:
        'An email was sent to your registered email, follow the instructions to reset your password',
      status: 'success',
    });
    reset();
    navigate('/', { replace: true });
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
              <InputLeftElement pointerEvents='none' children={<EmailIcon color='gray.300' />} />
              <Input type='email' placeholder='Enter your email...' {...register('email')} />
            </InputGroup>
            {errors?.email && <FormErrorMessage>{errors?.email.message}</FormErrorMessage>}
          </FormControl>

          <CustomButton isLoading={isSubmitting}>Send Reset Link</CustomButton>
        </VStack>
      </form>
    </Container>
  );
}
