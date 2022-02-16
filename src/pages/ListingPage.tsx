import * as React from 'react';

import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Text, Link, Spinner, useToast, Center, HStack } from '@chakra-ui/react';
import { Heading, Divider, UnorderedList, ListItem, Badge, Button } from '@chakra-ui/react';

import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';
import SlideShow from '@/components/SlideShow';
import ShareButton from '@/components/ShareButton';
import Map from '@/components/Map';

import { auth } from '@/firebase.config';

export default function ListingPage() {
  const {
    listingActions: { fetchSingleListing },
  } = useActions();
  const { listing, isLoading, isError, errorMessage } = useAppSelector((state) => state.listing);

  const params = useParams();
  const toast = useToast();

  React.useEffect(() => {
    if (isError) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: errorMessage,
        status: 'error',
      });
    }
  }, [isError]);

  React.useEffect(() => {
    if (params?.listingId) {
      fetchSingleListing(params?.listingId);
    }
  }, [params?.listingId]);

  if (isLoading) {
    return (
      <Center h='20rem'>
        <Spinner size='lg' />
      </Center>
    );
  }

  return (
    <Box mt={8} position='relative'>
      {/* SLIDER */}
      {listing && (
        <Box pos='relative' mb={6}>
          <ShareButton />
          <SlideShow images={listing?.imgUrls} />
        </Box>
      )}

      {/* Property Details */}
      {!isLoading && listing && (
        <Box>
          <Heading as='h2'>
            {listing.name} -{' '}
            <Box as='span' color='brand.accent'>
              $
              {listing.offer
                ? listing?.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Box>
          </Heading>
          <Heading as='h3' fontSize='xl' mt={2}>
            {listing.location}
          </Heading>
          <HStack spacing={4} mt={2}>
            <Badge colorScheme='green'>{listing.type}</Badge>
            <Badge colorScheme='purple'>{listing.offer && 'Has Offer'}</Badge>
            <Badge>
              ${listing.offer ? listing.price - listing?.discountedPrice! : null} Discount
            </Badge>
          </HStack>
          <Divider my={4} />

          {/* Details */}
          <Box>
            <Heading as='h4' color='primary' fontSize='2xl' mt={8}>
              Property Details
            </Heading>
            <UnorderedList>
              <ListItem>
                Total Area: {listing.area} m<sup>2</sup>
              </ListItem>
              <ListItem>Bathrooms: {listing.bathrooms}</ListItem>
              <ListItem>Bedrooms: {listing.bedrooms}</ListItem>
              <ListItem>Parking Spot: {listing.parking ? listing.parking : 'No'}</ListItem>
              <ListItem>Is Furnished: {listing.furnished ? 'Yes' : 'No'}</ListItem>
            </UnorderedList>
            <Text></Text>
            <Text></Text>
          </Box>

          {/* Description */}
          <Heading as='h3' color='primary' fontSize='2xl' mt={6}>
            Property Description
          </Heading>
          <Box dangerouslySetInnerHTML={{ __html: listing.description }}></Box>

          {/* Map */}
          <Heading as='h3' color='primary' fontSize='2xl' mt={8}>
            Location
          </Heading>
          <Box h='20rem'>
            {listing.geolocation && (
              <Map geolocation={listing.geolocation} location={listing.location} />
            )}
          </Box>

          {/* Contact Owner */}
          <Box my={10} textAlign='center'>
            {auth.currentUser?.uid !== listing.userRef && (
              <Link as={RouterLink} to={`/contact/${listing.userRef}?listingName=${listing.name}`}>
                <Button bg='brand.accent' textColor='white'>
                  Contact Owner
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
