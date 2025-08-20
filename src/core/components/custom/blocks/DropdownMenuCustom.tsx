import { Button } from '@/core/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/shadcn/ui/dropdown-menu';
import { ScrollArea } from '@/core/components/shadcn/ui/scroll-area';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export type DropdownMenuItemData = Array<{
  menuItem?: ReactNode;
  linkUrl?: string;
  propertys?: React.ComponentProps<typeof DropdownMenuItem>;
  activeSeparator?: boolean;
}>;

interface Props extends React.ComponentProps<typeof DropdownMenuContent> {
  childrenTrigger?: ReactNode;
  menuItems?: DropdownMenuItemData;
  label?: string;
  footer?: DropdownMenuItemData;
}

const MenuItem = ({
  item,
  index,
  menuItems,
  label,
}: {
  item: DropdownMenuItemData[number];
  index: number;
  menuItems: DropdownMenuItemData;
  label?: string;
}) => {
  return (
    <>
      {/* // Renders a separator if either item.activeSeparator is true or the item is the first (index === 0), not the last, and a valid label exists. */}
      {item?.activeSeparator || (index === 0 && index !== menuItems?.length - 1 && !!label) ? (
        <DropdownMenuSeparator />
      ) : (
        ''
      )}
      {item?.linkUrl ? (
        <Link href={item?.linkUrl ?? ''}>
          <DropdownMenuItem className="cursor-pointer" {...item?.propertys}>
            {item?.menuItem}
          </DropdownMenuItem>
        </Link>
      ) : (
        <DropdownMenuItem className="cursor-pointer" {...item?.propertys}>
          {item?.menuItem}
        </DropdownMenuItem>
      )}
    </>
  );
};
export function DropdownMenuCustom({ childrenTrigger, menuItems, label, footer, ...props }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {childrenTrigger ? (
          childrenTrigger
        ) : (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="overflow-hidden before:content-[''] before:absolute before:top-0.5 before:left-0 before:right-0 before:h-4 before:bg-gradient-to-b before:from-blue-300/30 before:to-transparent before:pointer-events-none after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-4 after:bg-gradient-to-t after:from-blue-300/30 after:to-transparent after:pointer-events-none"
        {...props}
      >
        <div className="relative max-h-28 overflow-y-auto scrollbar-none">
          <ScrollArea className="max-h-28">
            {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
            {menuItems?.map((item, index) => {
              return <MenuItem index={index} item={item} menuItems={menuItems} label={label} key={index} />;
            })}
          </ScrollArea>
        </div>
        {footer?.map((item, index) => {
          return <MenuItem index={index} item={item} menuItems={menuItems} label={label} key={index} />;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
