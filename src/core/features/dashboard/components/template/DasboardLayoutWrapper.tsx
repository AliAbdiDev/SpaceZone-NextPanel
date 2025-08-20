'use client';
import { SidebarConfig } from '@/core/features/dashboard/assets/types';
import { DashboardContextProvider } from '../../services/providers';
import { UserRoles } from '@/core/assets/types/entities';
import { DashboardLayout } from './DashboardLayout';

interface Props {
  children: React.ReactNode;
  role: UserRoles;
  sidebarConfig: SidebarConfig;
}

export default function DashboardLayoutWrapper({ children, role, sidebarConfig }: Props) {
  return (
    <DashboardContextProvider value={{ sidebarConfig, userRole: role }}>
      <DashboardLayout sidebarConfig={sidebarConfig}>{children}</DashboardLayout>
    </DashboardContextProvider>
  );
}
