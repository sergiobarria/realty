import * as React from 'react';

import { InputGroup, Input, InputProps, InputRightElement, Button } from '@chakra-ui/react';
import { InputLeftElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useField } from 'formik';

import { FormControl } from './FormControl';
import { BaseProps } from '@/types/FormTypes';

type InputFieldProps = {
  leftElement?: React.ReactNode;
} & BaseProps &
  InputProps;

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { name, label, leftElement, type, ...rest } = props;

  const [field] = useField(name);

  return (
    <FormControl name={name} label={label} {...rest}>
      <InputGroup>
        {leftElement && <InputLeftElement children={leftElement} color='gray.300' />}
        <Input
          {...field}
          {...rest}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        />
        {props.type === 'password' && (
          <InputRightElement color='gray.300'>
            <Button variant='unstyled' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default InputField;
