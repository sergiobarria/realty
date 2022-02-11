import React, { PropsWithChildren } from 'react';

import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';

export default function CustomRadioButton(props: PropsWithChildren<UseRadioProps>) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'brand.primary',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}
