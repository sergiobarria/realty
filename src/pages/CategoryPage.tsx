import React from 'react';

import { useParams } from 'react-router-dom';
import { Box, Spinner, Heading, useToast, Grid, GridItem } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Listing } from '@/utils/types';
import ListingCard from '@/components/ListingCard';

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
      console.log(listings);
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
        <Grid templateColumns='repeat(3, 1fr)' gap={6} mb={8}>
          {listings.map((listing: Listing) => (
            <GridItem key={listing.uid} colSpan={[3, 2, 1]}>
              <ListingCard listing={listing} />
            </GridItem>
          ))}
        </Grid>
      )}

      {!isLoading && listings?.length === 0 && (
        <Heading as='h3' fontSize='xl' fontWeight='medium'>
          There are not available listings for sale...
        </Heading>
      )}
    </Box>
  );
}
