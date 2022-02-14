import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { CSSReset } from '@chakra-ui/react';

import '@fontsource/lato';

import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <CSSReset />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
