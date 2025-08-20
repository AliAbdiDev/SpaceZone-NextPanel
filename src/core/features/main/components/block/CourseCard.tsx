'use client';
import React from 'react';
import Link from 'next/link';
import { cn, validateNonEmptyObject } from '@/core/utils';
import { MAPPING_COURSE_LEVEL } from '@/core/assets/mapping';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { truncateText } from '../../utils/truncateText';
import { TypographyH3 } from '@/core/components/custom/ui/Typography';
import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { CardProduct } from '../../assets/types/cardProduct';

// Helper function to map detail titles to Schema.org properties
const getSchemaProp = (title: string) => {
  const schemaMap: Record<string, string> = {
    'تاریخ شروع': 'startDate',
    'مدت زمان': 'duration',
    سطح: 'educationalLevel',
    مدرس: 'instructor',
    'هزینه دوره': 'price',
  };
  return schemaMap[title] || '';
};

const teacherNameHandler = (teachers?: { first_name: string; last_name: string }) => {
  if (!validateNonEmptyObject(teachers)) return 'تیم آموزشی';
  const { first_name, last_name } = teachers;
  return `${first_name || 'تعریف نشده'} ${last_name || ''}`;
};

const getCourseDetails = (course: CardProduct, isSoon?: boolean) => [
  {
    title: 'تاریخ شروع',
    value: isSoon ? 'به زودی' : course?.start_date || 'مشخص نشده',
    schemaProp: getSchemaProp('تاریخ شروع'),
  },
  {
    title: 'مدت زمان',
    value: course?.time ? `${course?.time} ساعت` : 'مشخص نشده',
    schemaProp: getSchemaProp('مدت زمان'),
  },
  {
    title: 'سطح',
    value: course?.level ? MAPPING_COURSE_LEVEL[course?.level] : '_',
    schemaProp: getSchemaProp('سطح'),
  },
  {
    title: 'مدرس',
    value: teacherNameHandler(course?.teachers) || '',
    schemaProp: getSchemaProp('مدرس'),
  },
  {
    title: 'هزینه دوره',
    value: isSoon ? '' : course?.final_price ? `${course?.final_price.toLocaleString()} تومان` : 'مشخص نشده',
    schemaProp: getSchemaProp('هزینه دوره'),
  },
];

const renderDiscount = (course: CardProduct) => {
  const discount = calculateDiscount(course?.price, course?.final_price);
  if (!discount) return null;
  return (
    <span className="flex items-center gap-2 rounded-lg text-xs md:text-sm p-1.5 md:px-3 py-1.5 bg-primary text-white ml-1">
      <s>{course?.price.toLocaleString()} تومان</s>
      <span>{discount}%</span>
    </span>
  );
};

/**
 * CourseCard: نمایش یک کارت دوره با جزییات
 */
interface CourseCardProps {
  courseData: CardProduct;
  isSoon?: boolean;
  className?: string;
  hrefLink?: string;
}

const CourseCard = ({ courseData, isSoon = false, className, hrefLink }: CourseCardProps) => {
  return (
    <div
      dir="rtl"
      className={cn(
        'bg-white rounded-xl shadow-md transition-all hover:shadow-lg overflow-hidden flex flex-col max-w-md',
        className
      )}
      itemScope
      itemType="https://schema.org/Course"
    >
      <div className="relative aspect-video">
        <ImgNormalCustom
          placeholder="empty"
          src={courseData?.image || '/placeholder-img.png'}
          alt={courseData?.title || 'دوره بدون عنوان'}
          fill
          className="object-cover"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <TypographyH3
          className="text-center text-foreground font-semibold text-lg line-clamp-2 max-md:text-base"
          itemProp="name"
        >
          <Link href={hrefLink ?? '#'} className="w-fit">
            {courseData?.title}
          </Link>
        </TypographyH3>

        <dl className="pt-6 space-y-1.5 pb-2 flex-grow text-base" aria-label="جزئیات دوره">
          {getCourseDetails(courseData, isSoon)
            .filter((detail) => !(detail.title === 'هزینه دوره' && isSoon))
            .map((detail, idx, arr) => (
              <div
                key={detail?.title}
                className={cn('flex items-center justify-between', {
                  'border-t border-zinc-300 pt-2': idx === arr.length - 1 && !isSoon,
                  'pb-2': idx === arr.length - 2,
                })}
              >
                <dt className="text-foreground">{detail?.title}:</dt>
                <dd className="text-primary flex items-center gap-2 truncate" itemProp={detail?.schemaProp}>
                  {detail?.title === 'هزینه دوره' && renderDiscount(courseData)}
                  {truncateText(detail?.value, 30)}
                </dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  );
};

export default CourseCard;
