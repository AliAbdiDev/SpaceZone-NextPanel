'use client';
import { ADMIN_DASHBOARD_CONFIG } from '@/core/features/dashboard/assets/configs/adminDashboardConfig';
import DashboardLayoutWrapper from '@/core/features/dashboard/components/template/DasboardLayoutWrapper';

function layout({ children }) {
  return (
    <DashboardLayoutWrapper role="admin" sidebarConfig={ADMIN_DASHBOARD_CONFIG}>
      {children}
    </DashboardLayoutWrapper>
  );
}

export default layout;
