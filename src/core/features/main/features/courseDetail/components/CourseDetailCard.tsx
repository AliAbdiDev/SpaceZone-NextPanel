import { cn } from '@/core/utils';
import PaymentBtn from './CourseDetailPaymentBtn';

function CourseDetailCard({ detailData = [] }: { detailData: any }) {
  const data: any = [
    {
      title: 'تاریخ شروع',
      value: detailData?.start_date,
    },
    {
      title: 'نوع دوره',
      value: detailData?.is_free ? 'رایگان' : 'دارای هزینه',
    },
    {
      title: 'تعداد جلسات',
      value: detailData?.lesson_num,
    },
    {
      title: 'مدت زمان',
      value: detailData?.time,
    },
    {
      title: 'سطح',
      value: {
        beginner: 'مقدماتی',
        intermediate: 'متوسط',
        advanced: 'پیشرفته',
      }[detailData?.level],
    },
    {
      title: 'تعداد دانشپذیر',
      value: detailData?.students_count,
    },

    {
      title: 'هزینه دوره',
      value: detailData?.final_price,
    },
  ];

  return (
    <div className="p-4 flex flex-col flex-grow bg-white rounded-xl shadow-md transition-all hover:shadow-lg overflow-hidden max-w-lg">
      <h1 className="text-center text-primary font-iranBold text-xl line-clamp-3 max-md:text-base">
        {detailData?.title ?? 'تعریف نشده'}
      </h1>
      <dl className="pt-6 space-y-2 pb-2 flex-grow" aria-label="جزئیات دوره">
        {data?.map((item, index) => (
          <div
            className={cn('flex items-center justify-between', {
              'border-t border-zinc-300 pt-2 mt-2': item?.title === 'هزینه دوره',
            })}
            key={index}
          >
            <dt className="text-foreground">
              {item?.title}
              <span className="font-semibold">:</span>
            </dt>
            <dd className={'text-primary flex items-center gap-2  max-w-32  truncate'}>
              {item?.value ?? 'تعریف نشده'}
            </dd>
          </div>
        ))}
        <div className="w-full pt-3 flex items-center justify-center">
          <PaymentBtn />
        </div>
      </dl>
    </div>
  );
}

export default CourseDetailCard;
