import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { user } = useAuth();

  console.log('Protected Route User: ', user);

  return user ? children : <Navigate to='/sign-in' />;
}
