import {
  FormControlProps,
  FormErrorMessageProps,
  FormLabelProps,
  InputProps,
} from '@chakra-ui/react';

export interface BaseProps extends FormControlProps {
  name: string;
  label?: string;
  labelProps?: FormLabelProps;
  errorMessageProps?: FormErrorMessageProps;
}

export type InputControlProps = BaseProps & { inputProps?: InputProps };
