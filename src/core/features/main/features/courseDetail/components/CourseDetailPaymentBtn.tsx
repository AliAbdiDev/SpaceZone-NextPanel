'use client';

import React from 'react';
import { Button } from '@/core/components/shadcn/ui/button';
import { useParams } from 'next/navigation';
import { useApiMutation } from '@/core/hooks/custom';
import { toast } from 'sonner';
import Link from 'next/link';

export default function PaymentBtn() {
  const params = useParams();

  const { mutate } = useApiMutation({
    endpoint: `/course/register/${params?.course_id}`,
    method: 'POST',
    toaster: {
      toasterDisabled: true,
    },
  });

  const handlePayment = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          toast.success('دوره با موفقیت خریداری شد', {
            duration: 4000,
            description: (
              <Link href="/dashboard/student/course-student/list" className="underline font-semibold text-green-800">
                برای مشاهده لیست دوره ها خود بر روی این متن کلیک کنید
              </Link>
            ),
          });
        },
        onError: () => {
          toast.error('خطا در خرید دوره');
        },
      }
    );
  };

  return (
    <Button className="font-semibold" onClick={handlePayment}>
      پرداخت و ثبت نام در دوره
    </Button>
  );
}
