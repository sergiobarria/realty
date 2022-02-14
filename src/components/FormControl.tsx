import * as React from 'react';

import { FormControl as ChakraFormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField } from 'formik';

import { BaseProps } from '@/types/FormTypes';

export const FormControl: React.FC<BaseProps> = (props: BaseProps) => {
  const { children, name, label, labelProps, errorMessageProps, ...rest } = props;

  const [, meta] = useField(name);

  return (
    <ChakraFormControl isInvalid={!!meta.error && meta.touched} {...rest}>
      {label && (
        <FormLabel htmlFor={name} {...labelProps} fontSize='sm' color='gray.600' mb={0}>
          {label}
        </FormLabel>
      )}
      {children}
      {meta.error && <FormErrorMessage {...errorMessageProps}>{meta.error}</FormErrorMessage>}
    </ChakraFormControl>
  );
};
