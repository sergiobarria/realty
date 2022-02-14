import { createSlice } from '@reduxjs/toolkit';

import { Listing } from '@/utils/types';
import { fetchSingleListing, fetchListings } from './listing.actions';

interface ListingObj {
  id: string;
  data: Listing;
}

interface ListingsState {
  listings: Listing[];
  listing?: Listing;
  isLoading: boolean;
  isError: boolean;
  errorMessage: any;
}

const initialListingsState: ListingsState = {
  listings: [],
  listing: undefined,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const listingSlice = createSlice({
  name: 'listing',
  initialState: initialListingsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(fetchSingleListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listing = action.payload;
      })
      .addCase(fetchSingleListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});
