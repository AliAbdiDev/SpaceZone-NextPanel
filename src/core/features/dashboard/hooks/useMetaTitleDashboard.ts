import { useMetaTitle } from '@/core/hooks/custom';
import { SidebarConfig } from '@/core/features/dashboard/assets/types';
import { UserRoles } from '@/core/assets/types/entities';
import { MAPPING_ROLES } from '@/core/assets/mapping';
import { useNavData } from './useNavData';

interface Props {
  userRole: UserRoles;
  navMain: SidebarConfig['navMain'];
}

export function useMetaTitleDashboard({ userRole, navMain }: Props) {

  const navData = useNavData(navMain);
  const pageTitle = navData?.mainNav?.title ?? '';
  useMetaTitle({ title: `${pageTitle ? `${pageTitle} | ` : ''}پنل ${MAPPING_ROLES[userRole] || 'کاربر'}` });
}