import React, { useState, useMemo } from 'react';

import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  FirestoreError,
  Query,
} from 'firebase/firestore';
import { db } from '@/firebase.config';
import { Listing } from '@/utils/types';

interface Data {
  id: string;
  data: Listing;
}

// export const useCollection = (queryCollection: string, category: string) => {
export const useCollection = (query: Query<DocumentData>) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError>();

  React.useEffect(() => {
    setLoading(true);

    const fetchListings = async () => {
      setError(undefined);
      try {
        // Run query
        const querySnapshot = await getDocs(query);

        const arr: Data[] = [];

        querySnapshot.forEach((doc) => {
          return arr.push({
            id: doc.id,
            data: doc.data() as Listing,
          });
        });

        setData(arr);
      } catch (error: any) {
        setError(error);
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const res = { data, loading, error };

  return useMemo(() => res, [res]);
};
