import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { googleSignIn, login, logout, register, resetPassword } from './auth.actions';

interface User {
  uid?: string;
  name: string;
  email: string;
}

interface AuthState {
  user?: User;
  isLoading: boolean;
  isError: boolean;
  errorMessage: any;
}

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register reducers
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    // Login reducers
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    // Logout reducer
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // Reset Password reducers
    builder
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.errorMessage = action.payload;
      });

    // Google signin reducers
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
