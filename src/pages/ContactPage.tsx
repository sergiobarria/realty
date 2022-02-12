import * as React from 'react';

import { useParams, useSearchParams } from 'react-router-dom';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { Box, Container, Heading, Text, useToast } from '@chakra-ui/react';

import { db } from '@/firebase.config';

export default function ContactPage() {
  const [message, setMessage] = React.useState<string>('');
  const [owner, setOwner] = React.useState<DocumentData | null>(null);
  const [error, setError] = React.useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const toast = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: error,
        status: 'error',
      });
    }
  }, [error]);

  React.useEffect(() => {
    const getOwner = async () => {
      console.log(params.ownerId);
      const docRef = doc(db, 'users', params.ownerId!);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        setError('There was an error getting user details');
      }

      if (docSnapshot.exists()) {
        console.log(docSnapshot.data());
        setOwner(docSnapshot.data());
      }
    };

    getOwner();
  }, [params.ownerId]);

  return (
    <Container maxW='30rem' my={10}>
      <Heading as='h1' color='brand.primary' mb='2rem'>
        Contact Owner
      </Heading>

      {owner && (
        <Box>
          <Text>Contact: {owner?.name}</Text>
        </Box>
      )}
    </Container>
  );
}
