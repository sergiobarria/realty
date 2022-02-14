import { db } from '@/firebase.config';
import { Listing } from '@/utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { query, where, orderBy, limit, collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const fetchListings = createAsyncThunk(
  'listing/fetchListingsByCategory',
  async (category: string, thunkAPI) => {
    try {
      const q = query(
        collection(db, 'listings'),
        where('type', '==', category),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      let listings: Listing[] = [];

      // I'm making timestamp as undefined because redux toolkit
      // detects it as non-serializable
      querySnapshot.forEach((doc) => {
        return listings.push({
          ...(doc.data() as Listing),
          uid: doc.id,
          timestamp: undefined,
        });
      });

      return listings;
    } catch (error: any) {
      console.error('Error', error.message);
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);

export const fetchSingleListing = createAsyncThunk(
  'listings/fetchSingleListing',
  async (id: string, thunkAPI) => {
    try {
      const listingRef = doc(db, 'listings', id);
      const docSnapshot = await getDoc(listingRef);

      if (!docSnapshot.exists()) {
        return thunkAPI.rejectWithValue(
          'There was an error fetching property details, please try again later'
        );
      }

      const listing: Listing = {
        ...(docSnapshot.data() as Listing),
        uid: docSnapshot.id,
        timestamp: undefined,
      };

      return listing;
    } catch (error: any) {
      console.error('Error', error.message);
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
