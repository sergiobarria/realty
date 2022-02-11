import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { HStack, useRadioGroup } from '@chakra-ui/react';
import { useController, Control, FieldValues } from 'react-hook-form';

import CustomRadioButton from './CustomRadioButton';

interface RadioGroupProps {
  control: Control<FieldValues>;
  label: string;
  name: string;
  isRequired?: boolean;
  options: string[];
}

export default function RadioGroup({ control, label, name, isRequired, options }: RadioGroupProps) {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    rules: { required: { value: true, message: 'Required field' } },
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  });

  const group = getRootProps();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]}>
      <FormLabel fontSize='sm' mb='0'>
        {label}
      </FormLabel>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });

          return (
            <CustomRadioButton key={value} {...radio}>
              {value}
            </CustomRadioButton>
          );
        })}
      </HStack>
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </FormControl>
  );
}
