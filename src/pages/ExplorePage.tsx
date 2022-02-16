import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Text, Link, Image, Grid, GridItem, Heading, Box } from '@chakra-ui/react';

import SlideShow from '@/components/SlideShow';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';

export default function ExplorePage() {
  const sliderImages = ['/images/intro-bg.jpg', '/images/for-rent.jpg', '/images/for-sale.jpg'];

  return (
    <>
      <SlideShow images={sliderImages} />

      <Box my={10} bg='gray.50' py={6}>
        <Heading as='h2' textAlign='center'>
          Our Service
        </Heading>
        <Features />
      </Box>

      <Heading as='h2' textAlign='center' mt={10}>
        Choose a Category
      </Heading>
      <Grid templateColumns='repeat(2, 1fr)' gap='6' maxW='container.md' mx='auto' my='8'>
        <GridItem mx='auto' colSpan={[2, 2, 1]}>
          <Link to='/category/for-sale' as={RouterLink}>
            <Image src='/images/for-sale.jpg' w={400} h={200} objectFit='cover' />
            <Text textAlign='center' color='brand.primary' fontWeight='bold'>
              PLACES FOR SALE
            </Text>
          </Link>
        </GridItem>
        <GridItem mx='auto' colSpan={[2, 2, 1]}>
          <Link to='/category/for-rent' as={RouterLink}>
            <Image src='/images/for-rent.jpg' w={400} h={200} objectFit='cover' />
            <Text textAlign='center' color='brand.primary' fontWeight='bold'>
              PLACES FOR RENT
            </Text>
          </Link>
        </GridItem>
      </Grid>

      {/* Testimonials */}
      <Box my={8}>
        <Testimonials />
      </Box>
    </>
  );
}
