import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, HStack, Image, Link, StackDivider, Text } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdSquareFoot } from 'react-icons/md';

import { Listing } from '@/utils/types';

interface ListingCardProps {
  // id: string;
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link to={`/category/${listing.type}/${listing.uid}`} as={RouterLink}>
      <Box border='1px' h='full' p='3' borderColor='gray.300' borderRadius='lg'>
        <Box>
          <Image
            src={listing.imgUrls[0] || listing.imgUrls[1]}
            alt='listing cover'
            borderTopRadius='lg'
            w='full'
            h='48'
          />
        </Box>

        <Box mt='2'>
          <Text fontSize='sm'>{listing.location}</Text>
          <Text fontSize='lg' color='brand.primary'>
            {listing.name}
          </Text>
          <Text color='primary' fontWeight='semibold'>
            $
            {listing.offer
              ? listing.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'for-rent' && ' / month'}
          </Text>
          <HStack spacing='20px' divider={<StackDivider />} mt='4'>
            <Flex as='span' alignItems='center' color='brand.primary'>
              <Box mr='2'>{listing.bedrooms}</Box> <FaBed size='25' />
            </Flex>
            <Flex as='span' alignItems='center' color='brand.primary'>
              <Box mr='2'>{listing.bathrooms}</Box> <FaBath size='20' />
            </Flex>
            <Flex as='span' alignItems='center' color='brand.primary'>
              <Flex mr='2'>
                <Text as='span'>{listing.area} </Text>
                <Text as='span'>
                  m<sup>2</sup>
                </Text>
              </Flex>{' '}
              <MdSquareFoot size='25' />
            </Flex>
          </HStack>
        </Box>
      </Box>
    </Link>
  );
}
