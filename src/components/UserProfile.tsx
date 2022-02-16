import { VStack } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box borderWidth='1px' borderRadius='lg' mt='4' p='3'>
      <VStack spacing='24px' align='stretch'>
        <Box>
          <Text fontSize='sm' color='gray.500'>
            Your Username:{' '}
          </Text>
          <Text textTransform='capitalize'>{user && user.name}</Text>
        </Box>

        <Box>
          <Text fontSize='sm' color='gray.500'>
            Your Email:{' '}
          </Text>
          <Text>{user && user.email}</Text>
        </Box>
      </VStack>
    </Box>
  );
}
