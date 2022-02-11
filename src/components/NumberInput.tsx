import React from 'react';

import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Box, Text } from '@chakra-ui/react';

interface NumberInputProps {
  register: UseFormRegisterReturn;
}

export default function NumberInput({ register }: NumberInputProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

  return (
    <Box>
      <Text fontSize='sm'>Number of Bedrooms</Text>
      <ChakraNumberInput w='20' defaultValue={1} min={1} max={20}>
        <NumberInputField {...rest} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </Box>
  );
}
