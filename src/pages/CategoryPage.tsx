import React from 'react';

import { useParams } from 'react-router-dom';
import { Box, Spinner, Heading, useToast, Flex } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Listing } from '@/utils/types';
import ListingCard from '@/components/ListingCard';

interface ListingObj {
  id: string;
  data: Listing;
}

export default function CategoryPage() {
  const params = useParams();
  const toast = useToast();
  const {
    listingActions: { fetchListings },
  } = useActions();
  const { listings, isLoading, isError } = useAppSelector((state) => state.listing);

  React.useEffect(() => {
    if (params?.categoryName) {
      fetchListings(params?.categoryName);
    }
  }, [params?.categoryName]);

  React.useEffect(() => {
    if (isError) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: 'There was an error fetching listings. Please try again later.',
        status: 'error',
      });
    }
  }, [isError]);

  return (
    <Box>
      <Box as='header' mb='8'>
        <Heading as='h1' color='brand.primary'>
          {params?.categoryName! === 'for-rent' ? 'Places for Rent' : 'Places for Sale'}
        </Heading>
      </Box>
      {isLoading && (
        <Box h='10rem'>
          <Center h='full'>
            <Spinner size='xl' color='primary' />
          </Center>
        </Box>
      )}

      {!isLoading && listings?.length > 0 && (
        <Flex flexWrap='wrap' gap={6}>
          {listings.map((listing: Listing) => (
            <ListingCard key={listing.uid} listing={listing} id={listing.uid} />
          ))}
        </Flex>
      )}

      {!isLoading && listings?.length === 0 && (
        <Heading as='h3'>There are not available listings for sale</Heading>
      )}
    </Box>
  );
}
