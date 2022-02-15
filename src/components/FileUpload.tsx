import React from 'react';

import { useField, useFormikContext } from 'formik';
import { Box, Button, Flex, HStack, InputGroup } from '@chakra-ui/react';
// import { UseFormRegisterReturn } from 'react-hook-form';
import { BaseProps } from '@/types/FormTypes';

type FileUploadProps = BaseProps & {
  accept?: string;
  multiple?: boolean;
  // children?: React.ReactNode;
};

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
  const { name, accept, multiple } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const { value, ...rest } = field;

  return (
    <InputGroup>
      <input
        {...rest}
        type='file'
        multiple={multiple || false}
        max='6'
        accept={accept}
        onChange={(e) => setFieldValue(field.name, e.currentTarget.files)}
      />
    </InputGroup>
  );
};

export default FileUpload;
