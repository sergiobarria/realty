import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/theme';

import Layout from '@/components/Layout';
import Routes from '@/router';

import { AuthContextProvider } from '@/context/auth.context';

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Layout>
            <Routes />
          </Layout>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}
