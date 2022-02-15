import * as React from 'react';
import { Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';

import { FormControl } from './FormControl';
import { BaseProps } from '@/types/FormTypes';

type SelectControlProps = BaseProps & {
  selectProps?: SelectProps;
  children: React.ReactNode;
};

const SelectField: React.FC<SelectControlProps> = (props: SelectControlProps) => {
  const { name, label, selectProps, children, ...rest } = props;
  const [field] = useField(name);

  return (
    <FormControl name={name} label={label} {...rest}>
      <Select {...field} id={name} {...selectProps}>
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
