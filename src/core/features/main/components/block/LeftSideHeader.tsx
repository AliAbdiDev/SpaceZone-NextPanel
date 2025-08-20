'use client';
import { LayoutDashboard, SquareUser } from 'lucide-react';
// import UserMenu from './header/UserMenu';
import { ButtonLink } from '@/core/components/custom/ui/Buttons';
import { useAuthStore } from '@/core/services/state/auth';

import UserMenu from './header/UserMenu';
import { useLayoutEffect, useState } from 'react';
import { rolesDistinction } from '@/core/utils/rolesDistinction';

function LeftSideHeader() {
  const [isMounting, setIsMounting] = useState(true);
  const { token, userData } = useAuthStore((value) => value);
  const userRole = rolesDistinction(userData?.roles?.map((item) => item?.title))?.flags;

  const profileHref = userRole?.isAdmin
    ? '/admin'
    : userRole.isStudent
      ? '/student'
      : userRole.isTeacher
        ? '/teacher'
        : '';

  useLayoutEffect(() => setIsMounting(false), []);

  if (isMounting) return;

  if (token) {
    return (
      <UserMenu
        navigationLinks={[
          {
            label: 'پروفایل',
            href: `/dashboard${profileHref || '/student'}/user-profile`,
            icon: SquareUser,
          },
          {
            label: 'داشبورد',
            href: '/dashboard/admin',
            icon: LayoutDashboard,
          },
        ]}
      />
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <ButtonLink href="/sign-in" size="sm" className="text-sm px-8 ">
        ورود
      </ButtonLink>
      <ButtonLink href="#" variant="outline" size="sm" className="text-sm px-8 max-sm:hidden">
        ثبت نام
      </ButtonLink>
    </div>
  );
}

export default LeftSideHeader;
