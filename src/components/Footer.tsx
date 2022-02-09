import * as React from 'react';
import { Box, Container } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as='footer' mt='auto' py='2.5rem' bg='brand.primary' textColor='white'>
      <Container maxW='container.lg' centerContent>
        Realty &copy; Copyright {new Date().getFullYear()}
      </Container>
    </Box>
  );
}
