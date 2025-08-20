'use client';

import { ChevronLeft } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/core/components/shadcn/ui/collapsible';
import {
  SidebarContext,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/core/components/shadcn/ui/sidebar';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import { NavItem } from '../../assets/types';
import { useHelperContext } from '@/core/hooks/custom';
import { cn, validateNonEmptyArray } from '@/core/utils';
import { usePathname } from 'next/navigation';

export function NavMain({ items }: { items: NavItem[] }) {
  const { open: isOpen } = useHelperContext({ context: SidebarContext, contextName: 'SidebarContext' });
  const currentPath = usePathname();
  let firstLevelSubItemDisabled = null;
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items?.map((item: NavItem, index) => {
          if (item?.menuItemDisabled) return null;
          firstLevelSubItemDisabled = item?.items?.some((item) => item?.menuItemDisabled);
          return (
            <React.Fragment key={index}>
              {/* no subitems menu | condition: if subitems are disabled and only one exists */}
              {!validateNonEmptyArray(item?.items) || (firstLevelSubItemDisabled && item?.items?.length === 1) ? (
                <Link
                  href={item?.url ?? '#'}
                  className={cn('rounded-sm cursor-pointer block', {
                    'bg-sidebar-accent': currentPath.endsWith(item?.url),
                  })}
                >
                  <SidebarMenuButton tooltip={item?.title} className="cursor-pointer">
                    {item?.icon && <item.icon size={22} className="!size-5" />}
                    <span>{item.title}</span>
                    {validateNonEmptyArray(item?.items) && !firstLevelSubItemDisabled && item?.items?.length === 1 ? (
                      <ChevronLeft className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    ) : null}
                  </SidebarMenuButton>
                </Link>
              ) : (
                <Collapsible key={item.title} asChild defaultOpen={item?.isActive} className="group/collapsible">
                  <SidebarMenuItem className={cn('space-y-1.5')}>
                    <CollapsibleTrigger
                      asChild
                      className={cn('rounded-sm', { 'bg-sidebar-accent': currentPath.includes(item?.url) })}
                    >
                      <SidebarMenuButton tooltip={item?.title}>
                        {item?.icon && (
                          <Link
                            href={!isOpen ? (item?.secondaryUrl ?? '#') : '#'}
                            className={clsx('block', { 'cursor-auto pointer-events-none': isOpen })}
                          >
                            <item.icon size={22} />
                          </Link>
                        )}
                        <span>{item.title}</span>
                        {item?.items && item.items?.length > 0 && (
                          <ChevronLeft className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item?.items?.map((subItem, index) => {
                          if (subItem?.menuItemDisabled) return null;
                          return (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              className={cn('rounded-sm ps-0.5', {
                                'bg-sidebar-accent': currentPath.includes(subItem?.url),
                                'pb-1': index === item?.items?.length - 1,
                              })}
                            >
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url ?? '#'}>
                                  <span className="text-sidebar-foreground/80">{subItem?.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </React.Fragment>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
