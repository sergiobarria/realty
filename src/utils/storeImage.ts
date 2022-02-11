import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@/firebase.config';

export const storeImage = async (image: any) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const fileName = `${auth?.currentUser?.uid}-${image.name}-${uuidv4()}`;
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
