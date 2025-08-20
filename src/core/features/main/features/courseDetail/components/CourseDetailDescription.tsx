'use client';
import { Button } from '@/core/components/shadcn/ui/button';
import { cn, sanitizeHtml } from '@/core/utils';
import { useState } from 'react';

function CourseDetailDescription({ description = 'توضیحات ویدیو موجود نیست' }) {
  const [showMore, setShowMore] = useState(false);
  const isLong = description?.length > 300;
  return (
    <>
      <div className="relative">
        <div
          className={cn(
            'overflow-hidden transition-[max-height] duration-1000 descridivtion-section leading-10',
            showMore ? 'max-h-[2000divx]' : 'max-h-[10rem]'
          )}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(description || '') }}
        />

        {isLong && !showMore && (
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[rgba(239,242,249,0.9)] to-transparent" />
        )}
      </div>

      {isLong && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setShowMore((value) => !value)}>
            {showMore ? 'مشاهده کمتر مطالب' : 'مشاهده بیشتر مطالب'}
          </Button>
        </div>
      )}
    </>
  );
}

export default CourseDetailDescription;
