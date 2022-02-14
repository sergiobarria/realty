import { useAppDispatch } from './useAppDispatch';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActionCreators } from '@/store/auth';
import { listingActionCreators } from '@/store/listing';
import { useMemo } from 'react';

export const useActions = () => {
  const dispatch = useAppDispatch();

  const authActions = useMemo(() => bindActionCreators(authActionCreators, dispatch), [dispatch]);

  const listingActions = useMemo(
    () => bindActionCreators(listingActionCreators, dispatch),
    [dispatch]
  );

  return { authActions, listingActions };
};
