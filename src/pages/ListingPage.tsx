import React from 'react';

import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import { Box, Text, Link, Spinner, useToast, Center } from '@chakra-ui/react';
import { Heading, Divider, UnorderedList, ListItem, Badge, Button } from '@chakra-ui/react';

import SlideShow from '@/components/SlideShow';
import ShareButton from '@/components/ShareButton';
import Map from '@/components/Map';

import { auth, db } from '@/firebase.config';

export default function ListingPage() {
  const [listing, setListing] = React.useState<DocumentData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const navigate = useNavigate();
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
    setLoading(true);
    setError('');
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId!);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        setError('There was an error fetching property details, please try again later');
      }

      if (docSnapshot.exists()) {
        console.log(docSnapshot.data());
        setListing(docSnapshot.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
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
      {!loading && listing && (
        <Box>
          <Heading as='h2'>
            {listing.name} -{' '}
            <Box as='span' color='brand.accent'>
              $
              {listing.offer
                ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Box>
          </Heading>
          <Heading as='h3' fontSize='xl' mt={2}>
            {listing.location}
          </Heading>
          <Badge colorScheme='green'>{listing.type}</Badge>
          <Badge colorScheme='purple'>{listing.offer && listing.offer}</Badge>
          <Badge>${listing.offer ? listing.price - listing.discountedPrice : null} Discount</Badge>
          <Divider my={4} />

          {/* Details */}
          <Box>
            <Heading as='h4' color='brand.primary' fontSize='2xl' mt={8}>
              Property Details
            </Heading>
            <UnorderedList>
              <ListItem>
                Total Area: {listing.area} m<sup>2</sup>
              </ListItem>
              <ListItem>Bathrooms: {listing.bathrooms}</ListItem>
              <ListItem>Bedrooms: {listing.bedrooms}</ListItem>
              <ListItem>Parking Spot: {listing.parking ? 'Yes' : 'No'}</ListItem>
              <ListItem>Is Furnished: {listing.furnished ? 'Yes' : 'No'}</ListItem>
            </UnorderedList>
            <Text></Text>
            <Text></Text>
          </Box>

          {/* Description */}
          <Heading as='h3' color='brand.primary' fontSize='2xl' mt={6}>
            Property Description
          </Heading>
          <Box dangerouslySetInnerHTML={{ __html: listing.description }}></Box>

          {/* Map */}
          <Heading as='h3' color='brand.primary' fontSize='2xl' mt={8}>
            Location
          </Heading>
          <Box h='20rem'>
            <Map geolocation={listing.geolocation} location={listing.location} />
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
