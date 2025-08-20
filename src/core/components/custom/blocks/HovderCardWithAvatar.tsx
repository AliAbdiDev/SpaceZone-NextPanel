import { memo, ReactNode } from 'react';
import { TooltipHoverCard } from '../ui/TooltipCustom';
import { AvatarCustom } from '../ui/AvatarCustom';
import { cn, validateNonEmptyArray } from '@/core/utils';

export type HoverCardListItem = {
  title: ReactNode;
  value: ReactNode;
};
interface HoverCardWithAvatarProps {
  triggerContent: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  avatarSrc?: string;
  classNameAvatar?: string;
  listItems?: HoverCardListItem[];
}

export const HoverCardWithAvatar = memo(
  ({
    triggerContent,
    triggerClassName,
    contentClassName,
    classNameAvatar = 'size-9',
    listItems = [],
    avatarSrc,
  }: HoverCardWithAvatarProps) => {
    return (
      <TooltipHoverCard
        propertyHoverCardContent={{
          onClick: (e) => {
            e.stopPropagation();
          },
        }}
        childrenTrigger={<span className={cn('inline-block cursor-pointer', triggerClassName)}>{triggerContent}</span>}
        childrenContent={
          validateNonEmptyArray(listItems) ? (
            <div className={cn('text-sm', contentClassName)}>
              <div className="flex justify-start flex-col gap-3">
                {avatarSrc && (
                  <AvatarCustom variant="secondary" src={avatarSrc || ''} className={classNameAvatar} disabledToken />
                )}
                <ul className="text-[13px] space-y-[3px]">
                  {listItems?.map((item, index) => (
                    <li key={index}>
                      <span className="font-semibold">{item?.title}: </span>
                      <span>{item?.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null
        }
      />
    );
  }
);
HoverCardWithAvatar.displayName = 'HoverCardWithAvatar';
