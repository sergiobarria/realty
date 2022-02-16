import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useToast, VStack } from '@chakra-ui/react';
import { Container, Heading } from '@chakra-ui/react';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import { resetPasswordSchema } from '@/utils/formSchemas';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';

export default function ForgotPasswordPage() {
  const { authActions } = useActions();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { isError, errorMessage } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
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

  function resetPasswordHandler(formData: { email: string }) {
    const { email } = formData;

    authActions.resetPassword(email);

    toast({
      title: 'Email sent!',
      description:
        'An email was sent to your registered email, follow the instructions to reset your password',
      status: 'success',
    });

    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
  }

  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='brand.primary' mb='2rem'>
        Reset Password
      </Heading>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={resetPasswordHandler}
        validationSchema={resetPasswordSchema}
      >
        <Form>
          <VStack spacing={6} align='stretch'>
            <InputField name='email' label='Email' placeholder='Enter your email' />
            <SubmitButton isLoading={isLoading}>Send Reset Link</SubmitButton>
          </VStack>
        </Form>
      </Formik>
    </Container>
  );
}
