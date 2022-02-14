import { Container, Heading } from '@chakra-ui/react';

import SignUpForm from '@/components/SignUpForm';

export default function SignUpPage() {
  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='primary' mb='2rem'>
        Sign Up
      </Heading>
      <SignUpForm />
    </Container>
  );
}
