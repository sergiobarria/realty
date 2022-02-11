import React from 'react';

import AddListingForm from '@/components/AddListingForm';
import { Container, Heading } from '@chakra-ui/react';

export default function CreateListingPage() {
  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='brand.primary' mb='2rem'>
        Add a New Listing
      </Heading>
      <AddListingForm />
    </Container>
  );
}
