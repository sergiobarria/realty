import React from 'react';

import { Box, Spinner, Heading, useToast, Text, Grid, GridItem } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

import ListingCard from '@/components/ListingCard';
import { Listing } from '@/utils/types';
import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function OffersPage() {
  const {
    listingActions: { fetchListings },
  } = useActions();
  const { isLoading, isError, listings } = useAppSelector((state) => state.listing);
  const toast = useToast();

  React.useEffect(() => {
    fetchListings('for-rent');
  }, []);

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
          Offers
        </Heading>
      </Box>
      {isLoading && (
        <Box h='10rem'>
          <Center h='full'>
            <Spinner size='xl' />
          </Center>
        </Box>
      )}

      {!isLoading && listings?.length > 0 && (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} mb={8}>
          {listings
            .filter((listing: Listing) => listing.offer)
            .map((listing: Listing) => (
              <GridItem key={listing.uid} colSpan={[3, 2, 1]}>
                <ListingCard listing={listing} />
              </GridItem>
            ))}
        </Grid>
      )}

      {!isLoading && listings?.length === 0 && <Text>There are no current offers...</Text>}
    </Box>
  );
}
