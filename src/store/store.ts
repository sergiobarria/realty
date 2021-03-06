import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/auth.slice';
import { listingSlice } from './listing/listing.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    listing: listingSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
