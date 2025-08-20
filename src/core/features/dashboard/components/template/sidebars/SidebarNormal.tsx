'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/core/components/shadcn/ui/sidebar';
import { ScrollArea } from '@/core/components/shadcn/ui/scroll-area';
import { RoleSwitcher } from '../role-switcher';
import { NavMain } from '../nav-main';
import { NavUser } from '../nav-user';
import { SidebarConfig, TSidebar } from '@/core/features/dashboard/assets/types';
import { memo } from 'react';

export const SidebarNormal = memo(({ sidbarConfig, ...props }: TSidebar & { sidbarConfig: SidebarConfig }) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <RoleSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full" dir="rtl">
          <NavMain items={sidbarConfig?.navMain} />
          {/* <NavProjects projects={sidbarConfig?.projects} /> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser systemMenuItems={sidbarConfig?.systemMenuItems} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});

SidebarNormal.displayName = 'SidebarNormal';
