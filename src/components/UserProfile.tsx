import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <Box borderWidth='1px' borderRadius='lg' mt='4' p='3'>
      <VStack spacing='24px' align='stretch'>
        <Box>
          <Text fontSize='sm' color='gray.500'>
            Your Username:{' '}
          </Text>
          <Text textTransform='capitalize'>{user && user.displayName}</Text>
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
