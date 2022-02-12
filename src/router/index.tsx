import { Routes, Route } from 'react-router-dom';

import ExplorePage from '@/pages/ExplorePage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import OffersPage from '@/pages/OffersPage';
import ProfilePage from '@/pages/ProfilePage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';
import CategoryPage from '@/pages/CategoryPage';
import CreateListingPage from '@/pages/CreateListingPage';
import ListingPage from '@/pages/ListingPage';
import ContactPage from '@/pages/ContactPage';

import RequireAuth from '@/components/RequireAuth';

export default function index() {
  return (
    <Routes>
      <Route path='/' element={<ExplorePage />} />
      <Route path='/category/:categoryName' element={<CategoryPage />} />
      <Route path='/category/:categoryName/:listingId' element={<ListingPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/contact/:ownerId' element={<ContactPage />} />
      <Route path='/offers' element={<OffersPage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/create-listing' element={<CreateListingPage />} />
      <Route
        path='/profile'
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
