import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

export default function NavLink({
  children,
  route,
  onClose,
}: React.PropsWithChildren<{ route: string; onClose?: () => void }>) {
  return (
    <Link
      as={RouterLink}
      to={route}
      variant='navLink'
      onClick={onClose && onClose}
    >
      {children}
    </Link>
  );
}
