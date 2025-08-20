'use client';
import React, { ReactNode, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ButtonIcon } from '@/core/components/custom/ui/Buttons';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { validateNonEmptyArray } from '@/core/utils';

interface Props<T> {
  sliderData: T[];
  children: (item: T, index: number) => ReactNode;
}

export default function SliderCustom<T>({ children, sliderData }: Props<T>) {
  const sliderRef = useRef<Slider>(null);
  if (!validateNonEmptyArray(sliderData)) {
    return null;
  }

  const next = () => sliderRef.current?.slickNext();
  const previous = () => sliderRef.current?.slickPrev();

  const settings: React.ComponentProps<typeof Slider> = {
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    pauseOnHover: true,
    rtl: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          draggable: true,
          swipe: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          draggable: true,
          swipe: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl mx-auto">
      <Slider ref={sliderRef} {...settings}>
        {sliderData.map((item, index) => (
          <div key={index} className="px-2 py-4">
            {children(item, index)}
          </div>
        ))}
      </Slider>
      <div className="pt-4 w-full flex justify-start items-center gap-4 pr-5">
        <ButtonIcon onClick={previous} className="bg-white">
          <ArrowRight />
        </ButtonIcon>
        <ButtonIcon onClick={next} className="bg-white">
          <ArrowLeft />
        </ButtonIcon>
      </div>
    </div>
  );
}
