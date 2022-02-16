import * as React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, DocumentData } from 'firebase/firestore';
import { Button, Divider, Grid, GridItem } from '@chakra-ui/react';
import { Box, Heading, Flex, Text, Link } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import { useActions } from '@/hooks/useActions';
import UserProfile from '@/components/UserProfile';
import { auth, db } from '@/firebase.config';

export default function ProfilePage() {
  const { authActions } = useActions();
  const [listings, setListings] = React.useState<{ id: string; data: DocumentData }[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings');

      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser?.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);

      let listings: { id: string; data: DocumentData }[] = [];

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser?.uid]);

  const handleLogout = async () => {
    authActions.logout();
    navigate('/', { replace: true });
  };

  return (
    <Box mt='6'>
      <Grid gridTemplateColumns='repeat(3, 1fr)' gap='6'>
        <GridItem colSpan={[3, 3, 1]}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading as='h3' fontSize='2xl' textColor='brand.primary'>
              USER PROFILE
            </Heading>
            <Button
              size='sm'
              bg='transparent'
              textColor='red.500'
              _hover={{ textColor: 'primary' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
          <Divider my='2' />
          <Box>
            <UserProfile />
          </Box>
        </GridItem>
        <GridItem colSpan={[3, 3, 2]}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading as='h3' fontSize='2xl' textColor='brand.primary'>
              YOUR LISTINGS
            </Heading>
            <Link to='/create-listing' as={RouterLink}>
              <Button
                size='sm'
                bg='primary'
                color='white'
                _hover={{ color: 'primary', bg: 'gray.900' }}
              >
                Add a New Listing
              </Button>
            </Link>
          </Flex>
          <Divider my='2' />
          <Box>
            {!loading && !listings && <Text>You have no listings yet...</Text>}

            {!loading &&
              listings &&
              listings.map((listing) => <p key={listing.id}>{listing.data.name}</p>)}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
