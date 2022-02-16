import { Form, useFormikContext } from 'formik';
import { Button, VStack, HStack } from '@chakra-ui/react';

import NumberInputField from '@/components/NumberInputField';
import SelectField from './SelectField';
import InputField from './InputField';
import { TextareaField } from './TextareaField';

import { ListingFormInputs } from '@/types/FormTypes';
import FileUpload from './FileUpload';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function AddListingForm() {
  const { values, isSubmitting } = useFormikContext<ListingFormInputs>();
  const { isLoading } = useAppSelector((state) => state.listing);

  return (
    <Form>
      <VStack spacing={8} align='stretch'>
        <SelectField name='type' label='Listing Type'>
          <option value='for-rent'>Rent</option>
          <option value='for-sale'>Sale</option>
        </SelectField>

        <InputField name='name' label='Property Name' placeholder='Enter property name' />

        <HStack>
          <NumberInputField
            name='bedrooms'
            label='Number of Beds'
            showStepper
            numberInputProps={{ min: 0 }}
          />
          <NumberInputField
            name='bathrooms'
            label='Number of Bathrooms'
            showStepper
            numberInputProps={{ min: 0 }}
          />
        </HStack>

        <NumberInputField
          name='area'
          label={`Total Area (m2)`}
          showStepper
          numberInputProps={{ min: 1, precision: 2, defaultValue: 0 }}
        />

        <NumberInputField
          name='parking'
          label='Number of Parking Spots'
          showStepper
          numberInputProps={{ min: 0 }}
        />

        <SelectField name='furnished' label='Is the Property Furnished?'>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </SelectField>

        <TextareaField
          name='location'
          label='Property Address'
          textareaProps={{ placeholder: '8601 West Peachtree St Stratford, CT 06614' }}
        />

        <HStack>
          <NumberInputField
            name='geolocation.lat'
            label='Latitude'
            showStepper
            numberInputProps={{ precision: 5, defaultValue: 0 }}
          />
          <NumberInputField
            name='geolocation.lng'
            label='Longitude'
            showStepper
            numberInputProps={{ precision: 5, defaultValue: 0 }}
          />
        </HStack>

        <TextareaField
          name='description'
          label='Property Description'
          textareaProps={{
            placeholder: 'Enter a description for your property, be as descriptive as possible.',
            rows: 6,
          }}
        />

        <NumberInputField
          name='price'
          label='Property Regular Price (USD)'
          numberInputProps={{ min: 2, precision: 2 }}
        />

        <SelectField name='offer' label='Add Offer Price?'>
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </SelectField>

        {values?.offer && (
          <NumberInputField
            name='discountedPrice'
            label='Discounted Price (USD)'
            numberInputProps={{ min: 2, precision: 2 }}
          />
        )}

        {/* File Upload */}
        <FileUpload name='imgUrls' multiple accept='.jpg,.png,.jpeg' />
      </VStack>

      <Button
        type='submit'
        bg='primary'
        isLoading={isLoading}
        textColor='white'
        _hover={{ textColor: 'primary', bg: 'gray.900' }}
        mt={8}
      >
        Add Listing
      </Button>
    </Form>
  );
}
