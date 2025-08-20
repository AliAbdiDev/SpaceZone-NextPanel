'use client';
import { Media } from '@/core/assets/types/entities';
import { AccordionContentItem } from '@/core/components/custom/blocks/AccordionNormal';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/core/components/shadcn/ui/hover-card';
import DropdownMenuCustomDashboard from '@/core/features/dashboard/components/blocks/DropdownMenuDashboardCustom';
import { useApiQuery } from '@/core/hooks/custom';

function MediaAccordionItem({ endpoint }: { endpoint: string }) {
  const { data: mediaResult } = useApiQuery<{ data: { media: Media[] } }>({
    endpoint: endpoint ?? '',
  });
  const mediasData = mediaResult?.data?.media;

  // Sort media by created_at descending

  return (
    <>
      {mediasData?.map((mediaItem, index) => {
        const listItems = [
          {
            title: 'عنوان',
            value: mediaItem?.title,
          },
          {
            title: 'وضعیت ',
            value: mediaItem?.status,
          },
          {
            title: 'نوع مدیا',
            value: mediaItem?.type,
          },
        ];
        return (
          <AccordionContentItem key={mediaItem?.id ?? index} value={`${mediaItem?.id}`}>
            <div className="flex items-center justify-between">
              <HoverCard openDelay={100} closeDelay={200}>
                <HoverCardTrigger>
                  <span className="text-sm text-accent-foreground">{mediaItem?.title}</span>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit pl-2">
                  <ul className="text-[13px] space-y-2">
                    {listItems.map((item, idx) => (
                      <li key={idx}>
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
                    menuItem: (
                      <a href={mediaItem?.file_url || ''} target="_blank" rel="noopener">
                        دانلود مدیا
                      </a>
                    ),
                  },
                ]}
                editMenuItem={{
                  linkUrl: `/dashboard/admin/course-manage/lessons/medias/edit?media_id=${mediaItem?.id}`,
                }}
              />
            </div>
          </AccordionContentItem>
        );
      })}
    </>
  );
}

export default MediaAccordionItem;
