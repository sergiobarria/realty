import * as React from 'react';

import { Flex, IconButton, Text } from '@chakra-ui/react';
import { BsFillShareFill } from 'react-icons/bs';

export default function ShareButton() {
  const [shareLink, setShareLink] = React.useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    setShareLink(true);
    setTimeout(() => {
      setShareLink(false);
    }, 2000);
  }

  return (
    <Flex flexDir='column' alignItems='flex-end' position='absolute' right={5} top={5} zIndex={10}>
      <IconButton
        size='sm'
        rounded='full'
        aria-label='copy to clipboard'
        icon={<BsFillShareFill />}
        onClick={copyToClipboard}
      />
      {shareLink && (
        <Text fontSize='sm' bg='gray.300' w={24} mt={4} rounded='lg' textAlign='center' p={0.5}>
          Link copied!
        </Text>
      )}
    </Flex>
  );
}
