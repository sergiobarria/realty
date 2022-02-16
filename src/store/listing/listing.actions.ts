import { auth, db } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

import { storeImage } from '@/utils/storeImage';
import { Listing } from '@/utils/types';
import { ListingFormInputs } from '@/types/FormTypes';

export const fetchListings = createAsyncThunk(
  'listing/fetchListingsByCategory',
  async (category: string, thunkAPI) => {
    try {
      const q = query(
        collection(db, 'listings'),
        where('type', '==', category),
        // orderBy('timestamp', 'desc'),
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

export const createListing = createAsyncThunk(
  'listings/createListing',
  async (data: ListingFormInputs, thunkAPI) => {
    try {
      // Store images in Firestore
      const uploadedImgs = await Promise.all(
        [...data.imgUrls].map((image: string) => storeImage(image))
      ).catch((error: any) => {
        console.error(error);
        return thunkAPI.rejectWithValue('Unable to upload images');
      });

      // create new listing
      const listing: Listing = {
        ...data,
        imgUrls: uploadedImgs ? (uploadedImgs as string[]) : [],
        userRef: auth.currentUser?.uid || null,
      };

      const docRef = await addDoc(collection(db, 'listings'), listing);

      return docRef.id;
    } catch (error: any) {
      console.error('Error', error.message);
      return thunkAPI.rejectWithValue(error.message as string);
    }
  }
);
