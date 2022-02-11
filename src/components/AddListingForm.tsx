import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage, Input, HStack } from '@chakra-ui/react';
import { Button, VStack, Box, Text, Textarea, Flex } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';

import RadioGroup from '@/components/RadioGroup';
import FileUpload from './FileUpload';
import { storeImage } from '@/utils/storeImage';
import { validateFiles } from '@/utils/validateFiles';
import { auth, db } from '@/firebase.config';

export default function AddListingForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: { listingType: 'Rent', parking: 'No', furnished: 'No', offer: 'No' },
  });
  const isForRent = watch('listingType');
  const hasOffer = watch('offer');
  const images = watch('images');
  const price = watch('price');

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Oops!, Something went wrong!',
        description: error,
        status: 'error',
      });
    }
  }, [error]);

  async function addListingHandler(data: FieldValues) {
    // console.log(data);
    setError('');
    setLoading(true);

    // store images
    const imgUrls = await Promise.all([...data.imgUrls].map((image) => storeImage(image))).catch(
      (error) => {
        console.error(error);
        setLoading(false);
        setError('There was and error uploading your images. Try again.');
        return;
      }
    );

    const formData = {
      type: data.listingType === 'Rent' ? 'for-rent' : 'for-sale',
      name: data.name,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      parking: data.parking === 'Yes' ? true : false,
      furnished: data.furnished === 'Yes' ? true : false,
      area: data.area,
      location: data.address,
      geolocation: {
        lat: data.lat,
        lng: data.lng,
      },
      description: data.description,
      offer: data.offer === 'Yes' ? true : false,
      price: data.price as number,
      discountedPrice: data.discountedPrice || null,
      imgUrls,
      timestamp: serverTimestamp() as Timestamp,
      userRef: auth.currentUser?.uid,
    };

    try {
      const docRef = await addDoc(collection(db, 'listings'), formData);

      toast({
        title: 'Success!',
        description: 'New Listing created.',
        status: 'success',
      });
      navigate(`/category/${formData.type}/${docRef.id}`);
    } catch (error) {
      setError('There was an error creating new listing.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(addListingHandler)}>
      <VStack spacing='18px' align='stretch'>
        <RadioGroup
          control={control}
          options={['Sale', 'Rent']}
          label='Listing Type'
          name='listingType'
        />

        {/* Name */}
        <FormControl isInvalid={!!errors?.name}>
          <FormLabel htmlFor='name' fontSize='sm' mb='0'>
            Property Name
          </FormLabel>

          <Input
            type='text'
            placeholder='Enter property name'
            {...register('name', {
              required: 'Property name is required',
              min: 5,
            })}
          />
          {errors?.name && <FormErrorMessage>{errors?.name.message}</FormErrorMessage>}
        </FormControl>

        {/* Bathrooms & bedrooms */}
        <HStack spacing={10}>
          <Box>
            <Text fontSize='sm'>Number of Bedrooms</Text>
            <NumberInput w='20' defaultValue={1} min={1} max={20}>
              <NumberInputField {...register('bedrooms', { valueAsNumber: true })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Text fontSize='sm'>Number of Bathrooms</Text>
            <NumberInput w='20' defaultValue={1} min={1} max={20}>
              <NumberInputField {...register('bathrooms', { valueAsNumber: true })} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </HStack>

        {/* Parking Spot */}
        <RadioGroup control={control} options={['Yes', 'No']} label='Parking Spot' name='parking' />

        {/* Is Furnished */}
        <RadioGroup control={control} options={['Yes', 'No']} label='Furnished' name='furnished' />

        {/* Area */}
        <FormControl isInvalid={!!errors?.area}>
          <Box>
            <Text fontSize='sm'>
              Total Property Area (m<sup>2</sup>)
            </Text>
            <NumberInput w='12rem' defaultValue={1} precision={2} min={1}>
              <NumberInputField {...register('area', { valueAsNumber: true })} />
            </NumberInput>
          </Box>
          {errors?.area && <FormErrorMessage>{errors?.area.message}</FormErrorMessage>}
        </FormControl>

        {/* Address */}
        <FormControl isInvalid={!!errors?.address}>
          <FormLabel htmlFor='address' fontSize='sm'>
            Address
          </FormLabel>
          <Textarea
            rows={2}
            placeholder='8601 West Peachtree St Stratford, CT 06614'
            {...register('address', { required: 'Please add a valid address' })}
          />
          {errors?.address && <FormErrorMessage>{errors?.address.message}</FormErrorMessage>}
        </FormControl>

        {/* Location */}
        <HStack>
          <FormControl isInvalid={!!errors?.lat}>
            <Text fontSize='sm'>Location Latitude</Text>
            <NumberInput w='12rem' defaultValue={0} precision={5}>
              <NumberInputField {...register('lat', { required: true, valueAsNumber: true })} />
            </NumberInput>
          </FormControl>

          <FormControl isInvalid={!!errors?.lng}>
            <Text fontSize='sm'>Location Latitude</Text>
            <NumberInput w='12rem' defaultValue={0} precision={5}>
              <NumberInputField {...register('lng', { required: true, valueAsNumber: true })} />
            </NumberInput>
          </FormControl>
        </HStack>
        {(errors?.lng || errors?.lat) && (
          <FormErrorMessage>Add valid values for latitude and longitude</FormErrorMessage>
        )}

        {/* Description */}
        <FormControl isInvalid={!!errors.description}>
          <Text fontSize='sm'>Property Description</Text>
          <Textarea
            rows={5}
            placeholder='Property description'
            {...register('description', { required: 'Please add a description for the property' })}
          />
          {errors?.description && (
            <FormErrorMessage>{errors?.description.message}</FormErrorMessage>
          )}
        </FormControl>

        {/* Offer */}
        <RadioGroup control={control} options={['Yes', 'No']} label='Offer' name='offer' />

        {/* Price */}
        <FormControl isInvalid={!!errors.price}>
          <FormLabel htmlFor='price' fontSize='sm'>
            Price (USD)
          </FormLabel>
          <Flex alignItems='center'>
            <NumberInput size='sm' defaultValue={0} min={0} precision={2} w='8rem'>
              <NumberInputField
                {...register('price', {
                  required: 'Property price is required',
                  valueAsNumber: true,
                })}
              />
            </NumberInput>
            {isForRent === 'Rent' && <Text ml={2}>$/month</Text>}
          </Flex>
          {errors?.price && <FormErrorMessage>{errors?.price.message}</FormErrorMessage>}
        </FormControl>

        {/* Discounted Price */}
        {hasOffer === 'Yes' && isForRent === 'Sale' && (
          <Box>
            <Text fontSize='sm'>Discounted Price (USD)</Text>
            <NumberInput size='sm' defaultValue={0} precision={2} w='6rem'>
              <NumberInputField
                {...register('discountedPrice', {
                  validate: { lessThanPrice: (v) => parseFloat(v) < price },
                })}
              />
            </NumberInput>
          </Box>
        )}

        {/* File Upload */}
        <FormControl isInvalid={!!errors.imgUrls}>
          <FormLabel>Add Images</FormLabel>
          <FileUpload
            accept='image/*'
            multiple
            register={register('imgUrls', { validate: validateFiles })}
          >
            <HStack align='start'>
              <Button textColor='brand.accent'>Upload Files</Button>
              <VStack align='start'>
                {images &&
                  images?.length > 0 &&
                  [...images].map((image) => (
                    <Text key={image.name} fontSize='sm' mt={0}>
                      {image.name}
                    </Text>
                  ))}
              </VStack>
            </HStack>
          </FileUpload>

          <FormErrorMessage>{errors.imgUrls && errors?.imgUrls.message}</FormErrorMessage>
        </FormControl>
      </VStack>

      <Button
        type='submit'
        bg='brand.primary'
        isLoading={isSubmitting}
        textColor='white'
        _hover={{ textColor: 'brand.accent', bg: 'gray.300' }}
        mt={8}
      >
        Add Listing
      </Button>
    </form>
  );
}
