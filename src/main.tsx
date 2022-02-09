import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { CSSReset } from '@chakra-ui/react';

import '@fontsource/lato';

ReactDOM.render(
  <React.StrictMode>
    <CSSReset />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
