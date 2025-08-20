import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/core/utils';
import AccordionNormal, { IAccordionItem } from '@/core/components/custom/blocks/AccordionNormal';
import { TypographyH4 } from '@/core/components/custom/ui/Typography';

const items: IAccordionItem[] = [
  {
    item: {
      header: {
        title: (
          <div className="flex items-center w-full">
            <TypographyH4 className="flex items-center justify-center rounded-full !border-2 size-7 text-xs !border-blue-400 font-bold">
              1
            </TypographyH4>
            <p className="text-foreground mr-4 flex-grow">عنوان درس اول</p>
            <span className="flex items-center justify-center border border-gray-300 rounded-full size-7">
              <MoreHorizontal className={cn('[&[data-state=open]]:rotate-180')} />
            </span>
          </div>
        ),
      },
      content: (
        <div className="space-y-3">
          <a href="/session-1" className="w-full flex items-center justify-between border-t border-gray-300 pt-3">
            <p className="text-foreground"></p>
            <p className="text-primary">جلسه اول</p>
          </a>
          <a href="/session-2" className="w-full flex items-center justify-between border-t border-gray-300 pt-3">
            <p className="text-foreground"></p>
            <p className="text-primary">جلسه دوم</p>
          </a>
        </div>
      ),
      propertys: {
        className: '!bg-white !mb-4 !rounded-lg !py-1.5 !shadow-md border-none', // استایل AccordionItem
        value: 'عنوان درس اول',
      },
      triggerPropertys: {
        className:
          '!bg-[#e0f7fa] rounded-md py-2 px-4 text-[15px] leading-6 outline-none hover:!no-underline focus-visible:ring-0',
      },
      contentPropertys: {
        className: 'bg-[#ffffff] px-4 py-3 space-y-3',
      },
    },
    nestedItem: [
      {
        item: {
          header: {
            title: (
              <div className="flex items-center w-full">
                <TypographyH4 className="flex items-center justify-center rounded-full !border-2 size-7 text-xs !border-blue-400 font-bold">
                  1.1
                </TypographyH4>
                <p className="text-foreground mr-4 flex-grow">عنوان زیرمجموعه</p>
                <span className="flex items-center justify-center border border-gray-300 rounded-full size-7">
                  <MoreHorizontal className={cn('[&[data-state=open]]:rotate-180')} />
                </span>
              </div>
            ),
          },
          content: (
            <div className="space-y-3">
              <a
                href="/sub-session-1"
                className="w-full flex items-center justify-between border-t border-gray-300 pt-3"
              >
                <p className="text-foreground"></p>
                <p className="text-primary">زیرجلسه اول</p>
              </a>
            </div>
          ),
          propertys: {
            value: 'd',
            className: '!bg-white !mb-4 !rounded-lg !py-1.5 !shadow-md border-none mt-3',
          },
          triggerPropertys: {
            className:
              '!bg-[#e0f7fa] rounded-md py-2 px-4 text-[15px] leading-6 outline-none hover:!no-underline focus-visible:ring-0',
          },
          contentPropertys: {
            className: 'bg-[#ffffff] px-4 py-3 space-y-3',
          },
        },
      },
    ],
  },
];

function CourseDetailAccordion() {
  return (
    <div dir="rtl" className="p-4">
      <AccordionNormal
        items={items}
        maxLevel={3}
        accordionProperty={{
          type: 'multiple',
        }}
      />
    </div>
  );
}

export default CourseDetailAccordion;
