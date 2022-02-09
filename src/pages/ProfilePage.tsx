import * as React from 'react';

import { Divider, Grid, GridItem } from '@chakra-ui/react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import UserProfile from '@/components/UserProfile';

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
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
            <Box
              as='button'
              textColor='brand.accent'
              _hover={{ textColor: 'brand.primary' }}
              onClick={handleLogout}
            >
              Logout
            </Box>
          </Flex>
          <Divider my='2' />
          <Box>
            <UserProfile />
          </Box>
        </GridItem>
        <GridItem colSpan={[3, 3, 2]}>
          <Heading as='h3' fontSize='2xl' textColor='brand.primary'>
            YOUR LISTINGS
          </Heading>
          <Divider my='2' />
          <Box>
            <Text>You have no listings yet...</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
