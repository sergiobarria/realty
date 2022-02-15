import * as React from 'react';

import {
  NumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputProps,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

import { BaseProps } from '@/types/FormTypes';
import { FormControl } from './FormControl';

type NumberInputFieldProps = BaseProps & {
  numberInputProps?: NumberInputProps;
  showStepper?: boolean;
  children?: React.ReactNode;
};

const NumberInputField: React.FC<NumberInputFieldProps> = (props: NumberInputFieldProps) => {
  const { name, label, showStepper, children, numberInputProps, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const _setFieldValue = (name: string) => (value: any) => setFieldValue(name, value);

  return (
    <FormControl name={name} label={label} {...rest}>
      <NumberInput
        {...field}
        id={name}
        onChange={_setFieldValue(name)}
        isInvalid={!!meta.error && meta.touched}
        {...numberInputProps}
      >
        <ChakraNumberInputField name={name} />
        {showStepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
    </FormControl>
  );
};

export default NumberInputField;
