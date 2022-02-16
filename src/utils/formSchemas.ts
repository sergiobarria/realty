import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  email: yup.string().email('Please add a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please add a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email('Please add a valid email').required('Email is required'),
});

export const creatListingFormSchema = yup.object().shape({
  type: yup.string().required('Listing type is required'),
  name: yup.string().required('Property name is required'),
  bedrooms: yup.number().min(1).required('Number of bedrooms is required'),
  bathrooms: yup.number().min(1).required('Number of bathrooms is required'),
  area: yup.number().min(1).required('Total property area is required'),
  parking: yup.number().min(0).required('Number of parking spots is required'),
  furnished: yup.boolean().required('Add if the property is furnished'),
  location: yup.string().required('Add property address'),
  lat: yup.number().required('Latitud required'),
  lng: yup.number().required('Longitude required'),
  description: yup.string().required('Add property description'),
  price: yup.number().min(1).required('Add property price in USD'),
  offer: yup.boolean().required().default(false),
  imgUrls: yup.array().of(yup.string()).nullable(),
});
