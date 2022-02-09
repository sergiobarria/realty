import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <Box>
      <form>
        <VStack spacing='24px' align='stretch'>
          <Box>
            <Text>Your Username: {user && user.displayName}</Text>
          </Box>

          <Box>
            <Text as='p'>Your Email: {user && user.email}</Text>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}
