import { Timestamp } from 'firebase/firestore';

export type Listing = {
  uid: string;
  description: string;
  // slug: string;
  name: string;
  area: number;
  userRef: string;
  timestamp?: Timestamp;
  price: number;
  offer: boolean;
  parking: boolean;
  discountedPrice?: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  geolocation?: {
    lat: number;
    lng: number;
  };
  imgUrls: string[];
  location: string;
  type: string;
};
