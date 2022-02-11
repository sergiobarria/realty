import React from 'react';

import { useParams } from 'react-router-dom';
import { query, where, orderBy, limit, collection } from 'firebase/firestore';
import { Box, Spinner, Heading, useToast, Flex } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

import { useCollection } from '@/hooks/useCollection';
import { Listing } from '@/utils/types';
import ListingCard from '@/components/ListingCard';
import { db } from '@/firebase.config';

interface ListingObj {
  id: string;
  data: Listing;
}

export default function CategoryPage() {
  const params = useParams();
  const toast = useToast();
  const q = query(
    collection(db, 'listings'),
    where('type', '==', params?.categoryName),
    orderBy('timestamp', 'desc'),
    limit(10)
  );
  const { data, loading, error } = useCollection(q);

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: 'There was an error fetching listings. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Box>
      <Box as='header' mb='8'>
        <Heading as='h1' color='brand.primary'>
          {params?.categoryName! === 'for-rent' ? 'Places for Rent' : 'Places for Sale'}
        </Heading>
      </Box>
      {loading && (
        <Box h='10rem'>
          <Center h='full'>
            <Spinner size='xl' />
          </Center>
        </Box>
      )}

      {!loading && data?.length > 0 && (
        <Flex flexWrap='wrap' gap={6}>
          {data.map((listing: ListingObj) => (
            <ListingCard key={listing.id} listing={listing.data} id={listing.id} />
          ))}
        </Flex>
      )}
    </Box>
  );
}
