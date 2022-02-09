import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please add a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please add a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});
