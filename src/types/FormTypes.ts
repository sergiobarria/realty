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

export interface ListingFormInputs {
  type: 'for-rent' | 'for-sale';
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  furnished: boolean;
  location: string;
  geolocation: {
    lat: number;
    lng: number;
  };
  description: string;
  area: number;
  offer: boolean;
  price: number;
  discountedPrice?: number;
  imgUrls: string[];
}
