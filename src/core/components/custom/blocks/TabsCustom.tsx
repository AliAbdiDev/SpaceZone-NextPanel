import React, { ReactNode } from 'react';
import { ScrollArea, ScrollBar } from '@/core/components/shadcn/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/shadcn/ui/tabs';
import { validateNonEmptyArray } from '@/core/utils';

export interface TabItem {
  title?: ReactNode | null;
  tabContent?: {
    content?: ReactNode | null;
    properties?: Omit<React.ComponentProps<typeof TabsContent>, 'value'>;
  };
  icon?: ReactNode | null;
  value: string | null;
  properties?: Omit<React.ComponentProps<typeof TabsTrigger>, 'value'>;
}

interface TabsCustomProps {
  tabs: TabItem[];
}

export function TabsCustom({ tabs, ...props }: TabsCustomProps & React.ComponentProps<typeof Tabs>) {
  if (!validateNonEmptyArray(tabs)) return null;
  return (
    <Tabs className="w-full flex items-start justify-start" {...props} dir="rtl">
      <ScrollArea className="rounded-sm">
        <TabsList className="bg-background mb-3 h-auto gap-1 p-0 shadow-xs rtl:gap-1" dir="rtl">
          {tabs?.map((tab, index) => (
            <TabsTrigger
              key={`tab-${index}-${tab?.value}`}
              value={tab?.value}
              className="hover:bg-accent/70 bg-accent/40 inline-flex cursor-pointer data-[state=active]:bg-accent/70 data-[state=active]:after:bg-primary/50 relative rounded-sm border py-2 px-3 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5"
              {...tab?.properties}
              dir="rtl"
            >
              {tab?.icon && (
                <span className="-ms-0.5 me-1.5 opacity-60" aria-hidden="true">
                  {tab?.icon}
                </span>
              )}
              {tab?.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {tabs?.map((tab, index) => (
        <TabsContent className="w-full mt-5" key={`tab-${index}`} value={tab?.value} {...tab?.tabContent?.properties}>
          {tab?.tabContent?.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
