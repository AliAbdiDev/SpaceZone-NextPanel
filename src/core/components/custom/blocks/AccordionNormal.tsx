import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/core/components/shadcn/ui/accordion';
import { cn, validateNonEmptyArray } from '@/core/utils';
import { ReactNode } from 'react';

export interface IAccordionItem {
  item: {
    header?: {
      title: ReactNode;
      content?: ReactNode;
    };
    content?: ReactNode;
    propertys?: React.ComponentProps<typeof AccordionItem>;
    triggerPropertys?: React.ComponentProps<typeof AccordionTrigger>;
    contentPropertys?: React.ComponentProps<typeof AccordionContent>;
  };
  nestedItem?: IAccordionItem[];
}

export interface AccordionNormalProps {
  items: IAccordionItem[];
  maxLevel?: number;
  level?: number;
  accordionProperty?: {
    type?: 'single' | 'multiple';
    collapsible?: boolean;
  };
}

/**
 * A nested accordion component that supports up to a specified level of nesting.
 * Displays a default item if no data is provided. Supports RTL and customizable properties for accordion items, triggers, and content.
 *
 * @param props - The component props.
 * @param props.items - Array of accordion items, each containing title, content, and optional nested items.
 * @param props.level - Current nesting level (default: 0).
 * @param props.maxLevel - Maximum nesting level allowed (default: 3).
 * @param props.accordionProperty - Additional properties for the Accordion component (e.g., type, collapsible).
 * @returns A JSX element representing the accordion.
 *
 * @example
 * ```tsx
 * import AccordionNormal from './AccordionNormal';
 *
 * const items = [
 *   {
 *     item: {
 *       title: "Item 1",
 *       content: "Content of Item 1",
 *       propertys: { disabled: false },
 *       triggerPropertys: { className: "text-blue-600" },
 *       contentPropertys: { className: "text-sm" },
 *     },
 *     nestedItem: [
 *       {
 *         item: {
 *           title: "Item 1-1",
 *           content: "Content of Item 1-1",
 *         },
 *       },
 *     ],
 *   },
 * ];
 *
 * function App() {
 *   return (
 *     <div dir="rtl" className="p-4">
 *       <AccordionNormal
 *         items={items}
 *         maxLevel={3}
 *         accordionProperty={{ type: "single", collapsible: true }}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export default function AccordionNormal({ items, level = 1, maxLevel = 3, accordionProperty }: AccordionNormalProps) {
  if (level > maxLevel) return null;

  const defaultItem: IAccordionItem = {
    item: {
      header: {
        title: 'اطلاعاتی موجود نیست',
      },
      content: 'هیچ محتوایی برای نمایش وجود ندارد.',
    },
  };

  const displayItems = validateNonEmptyArray(items) ? items : [defaultItem];

  return (
    <Accordion
      type={'multiple'}
      className={cn('space-y-3 w-full', 'rtl:space-x-reverse ', {
        'border rounded-lg': !validateNonEmptyArray(items),
      })}
      {...accordionProperty}
    >
      {displayItems?.map((accItem, index) => (
        <AccordionItem
          value={`${level}-${index}`}
          key={`${level}-${index}`}
          className={cn(
            'bg-background relative border px-4 py-1 outline-none w-full',
            'rounded-md',
            'has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 !border-b',
            { 'mt-3 bg-accent/40': level > 1 }
          )}
          {...accItem?.item?.propertys}
        >
          <div className="w-full flex items-center justify-between py-2">
            <AccordionTrigger
              className={cn(
                'justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none text-primary',
                'hover:!no-underline focus-visible:ring-0 [&>svg]:-order-1 cursor-pointer',
                { 'text-accent-foreground/80': level > 1 && accItem?.item?.content }
              )}
              {...accItem?.item?.triggerPropertys}
            >
              {accItem?.item?.header?.title}
            </AccordionTrigger>
            {accItem?.item?.header?.content}
          </div>

          <AccordionContent
            className={cn('mt-2', {
              ' pt-3': accItem === defaultItem || !accItem?.nestedItem,
            })}
            {...accItem?.item?.contentPropertys}
          >
            {accItem?.item?.content}
            {validateNonEmptyArray(accItem?.nestedItem) && (
              <AccordionNormal
                maxLevel={maxLevel}
                items={accItem?.nestedItem}
                level={level + 1}
                accordionProperty={accordionProperty}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const AccordionContentItem = ({ children, value }: { children: ReactNode; value: string }) => {
  return (
    <AccordionItem className="py-3" value={value ?? ''}>
      {children}
    </AccordionItem>
  );
};
