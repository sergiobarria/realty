import React from 'react';
import { Box, Button, Flex, HStack, InputGroup } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { SmallCloseIcon } from '@chakra-ui/icons';

interface FileUploadProps {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
}

export default function FileUpload({ register, accept, multiple, children }: FileUploadProps) {
  // const [images, setImages] = React.useState<FileList | null>();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

  const handleClick = () => inputRef.current?.click();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setImages(e.target.files);
  // };

  return (
    <InputGroup onClick={handleClick}>
      <input
        type='file'
        multiple={multiple || false}
        hidden
        max='6'
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        // onChange={handleChange}
      />
      <HStack spacing={8}>
        <Box>{children}</Box>
        {/* <Box fontSize='sm'>
          {images &&
            images?.length > 0 &&
            [...images].map((image) => <p key={image.name}>{image.name}</p>)}
        </Box> */}
      </HStack>
    </InputGroup>
  );
}
