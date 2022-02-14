import React from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@chakra-ui/react';

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface SlideShowProps {
  images: string[];
}

export default function SlideShow({ images }: SlideShowProps) {
  console.log(images);
  return (
    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    >
      {images &&
        images.map((url: string, index: number) => (
          <SwiperSlide key={index}>
            <Box
              style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
              h={['23vh', '30vh', '40vh']}
              w='full'
              pos='relative'
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
