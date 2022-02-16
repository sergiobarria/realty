import { Timestamp } from 'firebase/firestore';

export type Listing = {
  uid?: string;
  userRef: string | null;
  type: 'for-sale' | 'for-rent';
  name: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  furnished: boolean;
  location: string;
  geolocation?: {
    lat: number;
    lng: number;
  };
  description: string;
  price: number;
  offer: boolean;
  discountedPrice?: number;
  imgUrls: string[];
  timestamp?: Timestamp;
};
