"use client";

import Image from "next/image";

import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


import "./styles.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={` ${className} `}>
      <Swiper
      // style={{
      //   width: '100vh',
      //   height: '500px'
      // }}
        pagination={true}
        modules={[FreeMode,  Pagination]}
        className="mySwiper2">
        
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={ 600 }
              height={ 700 }
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
