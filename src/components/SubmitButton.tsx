import * as React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

type SubmitButtonProps = ButtonProps;

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...rest }) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      type='submit'
      isLoading={isSubmitting}
      bg='primary'
      textColor='white'
      loadingText='Sending'
      _hover={{ textColor: 'gray.700', backgroundColor: 'gray.300' }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
