import * as React from 'react';

import { Container, Flex } from '@chakra-ui/react';

import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Flex flexDir='column' minH='100vh'>
      <Navbar />
      <Container as='main' maxW='container.lg'>
        {children}
      </Container>
      <Footer />
    </Flex>
  );
}
