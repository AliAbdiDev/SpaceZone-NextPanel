'use client';
import React from 'react';
import Link from 'next/link';
import CourseCard from '../block/CourseCard';
import SliderCustom from './SliderCustom';

const CourseSlider = ({
  courses = [],
  labelSlider = null,
  isSoon = false,
  hrefLinks,
}: {
  courses: any[];
  labelSlider?: string | null;
  isSoon?: boolean;
  hrefLinks?: string;
}) => {
  return (
    <div className="w-full select-none">
      {!!labelSlider && (
        <div className="border-b border-primary mb-3 w-full flex items-center justify-between">
          <span className=" pr-3 pl-8 p-1.5 text-base rounded-tr-md rounded-tl-3xl bg-primary text-white">
            {labelSlider}
          </span>
          <Link href="/shop" className="font-iranBold text-lg text-primary">
            مشاهده همه
          </Link>
        </div>
      )}

      <SliderCustom sliderData={courses}>
        {(item) => (
          <CourseCard
            courseData={item}
            className="mx-auto h-full"
            isSoon={isSoon}
            hrefLink={hrefLinks ?? `/shop/${item?.id}`}
          />
        )}
      </SliderCustom>
    </div>
  );
};

export default CourseSlider;
