import { Container, Heading } from '@chakra-ui/react';

import SignInForm from '@/components/SignInForm';

export default function SignInPage() {
  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='primary' mb='2rem'>
        Sign In
      </Heading>
      <SignInForm />
    </Container>
  );
}
