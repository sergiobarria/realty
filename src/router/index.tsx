import * as React from 'react';

import { Routes, Route } from 'react-router-dom';

import ExplorePage from '@/pages/ExplorePage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import OffersPage from '@/pages/OffersPage';
import ProfilePage from '@/pages/ProfilePage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';

import RequireAuth from '@/components/RequireAuth';

export default function index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ExplorePage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/offers' element={<OffersPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        {/* <Route path='/profile' element={<ProtectedRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
        </Route> */}
      </Routes>
    </>
  );
}
