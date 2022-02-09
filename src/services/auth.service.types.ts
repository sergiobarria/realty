import { FieldValue } from 'firebase/firestore';

export interface User {
  uid?: string;
  name: string;
  email: string;
  password?: string;
  timestamp?: FieldValue;
}
