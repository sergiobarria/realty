import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme/theme';

import Routes from '@/router';

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </BrowserRouter>
  );
}
