import { useNavigate } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Flex, HStack, Link } from '@chakra-ui/react';

import Drawer from '@/components/Drawer';
import NavLink from '@/components/NavLink';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container as='header' h='5rem' maxW='container.lg'>
      <Flex h='full' alignItems='center' justifyContent='space-between'>
        <Link as={RouterLink} to='/'>
          <img src='/images/logo.svg' width={125} height={75} alt='company logo' />
        </Link>
        <HStack as='nav' display={['none', 'none', 'block']} spacing='2rem'>
          <NavLink route='/'>Explore</NavLink>
          <NavLink route='/offers'>Offers</NavLink>
          <NavLink route='/profile'>Profile</NavLink>
          {!user && (
            <Button
              bg='primary'
              textColor='white'
              size='sm'
              _hover={{ bg: 'gray.900', textColor: 'primary' }}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
          )}
        </HStack>
        <Box display={{ md: 'none' }}>
          <Drawer />
        </Box>
      </Flex>
    </Container>
  );
}
