import React from 'react';

import { Button } from '@chakra-ui/react';

interface CustomButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function CustomButton({ isLoading, children }: CustomButtonProps) {
  return (
    <Button
      type='submit'
      bg='primary'
      textColor='white'
      fontSize='lg'
      isLoading={isLoading}
      _hover={{ textColor: 'primary', backgroundColor: 'gray.300' }}
    >
      {children}
    </Button>
  );
}
