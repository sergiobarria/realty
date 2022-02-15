import * as React from 'react';
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';
import { useField } from 'formik';

import { BaseProps } from '@/types/FormTypes';
import { FormControl } from './FormControl';

type TextareaFieldProps = BaseProps & {
  textareaProps?: TextareaProps;
};

export const TextareaField: React.FC<TextareaFieldProps> = (props: TextareaFieldProps) => {
  const { name, label, textareaProps, ...rest } = props;
  const [field] = useField(name);

  return (
    <FormControl name={name} label={label} {...rest}>
      <ChakraTextarea {...field} id={name} {...textareaProps} />
    </FormControl>
  );
};
