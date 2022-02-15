import { createSlice } from '@reduxjs/toolkit';

import { Listing } from '@/utils/types';
import { fetchSingleListing, fetchListings, createListing } from './listing.actions';

interface ListingsState {
  listings: Listing[];
  listing?: Listing;
  listingId?: string;
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

    builder
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listingId = action.payload;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});
