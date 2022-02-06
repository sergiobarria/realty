import { extendTheme } from '@chakra-ui/react';

const theme = {
  colors: {
    brand: {
      primary: '#2289FF',
      light: '#0FA8E2',
      dark: '#14395B',
      text: '#8D9598',
      gray: '#303030',
    },
  },
};

const themes = extendTheme({ theme });

export default themes;
