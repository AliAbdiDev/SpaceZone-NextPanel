'use client';
import { Session } from '@/core/assets/types/entities';
import { FetchResultTotalItems } from '@/core/assets/types/fetchResult';
import { AccordionContentItem } from '@/core/components/custom/blocks/AccordionNormal';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/core/components/shadcn/ui/hover-card';
import DropdownMenuCustomDashboard from '@/core/features/dashboard/components/blocks/DropdownMenuDashboardCustom';
import { useApiQuery, useApiMutation } from '@/core/hooks/custom';
import { useAuthStore } from '@/core/services/state/auth';
import { validateNonEmptyArray } from '@/core/utils';
import { toJalali } from '@/core/utils/jalaliDateConverter';
import { useEffect, useRef } from 'react';

function SessionLessonAccordionItem({ endpoint }: { endpoint: string }) {
  const { userData } = useAuthStore((state) => state);
  const { data: sessionResult } = useApiQuery<FetchResultTotalItems<'sessions', Session>>({
    endpoint: endpoint ?? '',
  });

  const { data: sessionAccessLink, mutate } = useApiMutation({
    endpoint: `/session/event-access-link`,
    method: 'POST',
    toaster: {
      toasterDisabled: true,
    },
  });

  const sessionData = sessionResult?.data?.sessions?.items ?? [];

  const requestedRef = useRef<Set<string | number>>(new Set());
  useEffect(() => {
    const AlocamsessionData = sessionResult?.data?.sessions?.items ?? [];
    if (!userData) return;
    if (!validateNonEmptyArray(AlocamsessionData)) return;

    AlocamsessionData.forEach((sessionItem) => {
      const eventCode = sessionItem?.alocom_event_id || sessionItem?.id;
      if (!eventCode) return;

      if (requestedRef.current.has(eventCode)) return;

      mutate({
        event_code: sessionItem?.alocom_event_id || '',
        first_name: userData?.user?.first_name,
        last_name: userData?.user?.last_name,
        mobile: userData?.user?.mobile,
      });

      requestedRef.current.add(eventCode);
    });
  }, [userData, mutate, sessionResult?.data?.sessions?.items]);

  return (
    <>
      {sessionData?.map((sessionItem, index) => {
        const listItems = [
          {
            title: 'تاریخ برگزاری',
            value: sessionItem?.date ? toJalali(sessionItem?.date) : null,
          },
          {
            title: 'زمان شروع',
            value: sessionItem?.start_time,
          },
          {
            title: 'زمان پایان',
            value: sessionItem?.end_time,
          },
          {
            title: 'مدت زمان (دقیقه)',
            value: sessionItem?.duration,
          },
        ];
        return (
          <AccordionContentItem key={sessionItem?.id ?? index} value={`${sessionItem?.id}`}>
            <div className="flex items-center justify-between">
              <HoverCard openDelay={100} closeDelay={200}>
                <HoverCardTrigger>
                  <span className="text-sm text-accent-foreground ">جلسه: {sessionItem?.title}</span>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit pl-2">
                  <ul className="text-[13px] space-y-2">
                    {listItems?.map((item, index) => (
                      <li key={index}>
                        <span className="font-semibold">{item?.title}: </span>
                        <span>{item?.value ?? 'نامشخص'}</span>
                      </li>
                    ))}
                  </ul>
                </HoverCardContent>
              </HoverCard>

              <DropdownMenuCustomDashboard
                className="ml-5"
                menuItems={[
                  {
                    menuItem: 'ورود به جلسه',
                    linkUrl: (sessionAccessLink as string) ?? '',
                  },
                ]}
                editMenuItem={{
                  linkUrl: `/dashboard/admin/course-manage/lessons/sessions/edit?session_id=${sessionItem?.id}`,
                }}
              />
            </div>
          </AccordionContentItem>
        );
      })}
    </>
  );
}

export default SessionLessonAccordionItem;
