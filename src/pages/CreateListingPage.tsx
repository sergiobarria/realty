import React from 'react';

import AddListingForm from '@/components/AddListingForm';
import { Container, Heading } from '@chakra-ui/react';
import { Formik } from 'formik';

import { creatListingFormSchema } from '@/utils/formSchemas';
import { ListingFormInputs } from '@/types/FormTypes';
import { useActions } from '@/hooks/useActions';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function CreateListingPage() {
  const {
    listingActions: { createListing },
  } = useActions();
  const { listingId } = useAppSelector((state) => state.listing);
  const initialValues: ListingFormInputs = {
    type: 'for-rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    furnished: false,
    location: '',
    geolocation: {
      lat: 0,
      lng: 0,
    },
    description: '',
    area: 0.0,
    offer: false,
    price: 0,
    imgUrls: [],
  };

  React.useEffect(() => {
    if (listingId) console.log(listingId);
  }, [listingId]);

  function addListingHandler(values: ListingFormInputs) {
    console.log(values);

    createListing(values);
  }
  return (
    <Container maxW='30rem' my='10'>
      <Heading as='h1' color='brand.primary' mb='2rem'>
        Add a New Listing
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={addListingHandler}
        validationSchema={creatListingFormSchema}
      >
        <AddListingForm />
      </Formik>
    </Container>
  );
}
