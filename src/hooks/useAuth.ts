import * as React from 'react';

import { AuthContext } from '../context/auth.context';

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext should be used inside a context provider');
  }

  return context;
}
