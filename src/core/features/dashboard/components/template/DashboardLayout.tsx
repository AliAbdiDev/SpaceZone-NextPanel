'use client';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/core/components/shadcn/ui/sidebar';
import { BreadcrumbCustom } from '../blocks';
import { ReactNode } from 'react';
import { PathNameMap, SidebarConfig } from '../../assets/types';
import { useDashboardLayout } from '../../services/providers';
import { useMetaTitleDashboard } from '../../hooks/useMetaTitleDashboard';
import { SidebarNormal } from './sidebars/SidebarNormal';

// const DashboardLayout = lazy(() =>
//   import('@/core/features/dashboard/components/template').then((module) => ({
//     default: module.DashboardLayout,
//   }))
// );

interface Props {
  children: ReactNode;
  sidebarConfig: SidebarConfig;
  pathNameMap?: PathNameMap;
}

export function DashboardLayout({ children }: Props) {
  const { userRole, sidebarConfig: sidbarConfig } = useDashboardLayout();
  useMetaTitleDashboard({ navMain: sidbarConfig['navMain'], userRole });

  return (
    <SidebarProvider>
      <SidebarNormal sidbarConfig={sidbarConfig} side="right" dir="rtl" />

      <SidebarInset className="left-auto right-0">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 fixed bg-background w-full origin-top-right z-50">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-mr-1 cursor-pointer" />
            <Separator orientation="vertical" className="ml-2 data-[orientation=vertical]:h-4" />
            <BreadcrumbCustom />
          </div>
        </header>
        {/* main content */}
        <div className="size-full p-4 pt-[4.5rem]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
