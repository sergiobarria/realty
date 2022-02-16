import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useAppSelector';

export default function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);

  return user ? children : <Navigate to='/sign-in' />;
}
