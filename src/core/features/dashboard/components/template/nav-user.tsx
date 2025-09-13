'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { ChevronsUpDown, LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/shadcn/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/core/components/shadcn/ui/sidebar';
import { useAuthStore } from '@/core/services/state/auth';
import { SystemMenuItem } from '../../assets/types';
import { AvatarUserCustom } from '@/core/components/custom/ui/AvatarUserCustom';
import { rolesDistinction } from '@/core/utils/rolesDistinction';
import { logoutHandler } from '@/core/features/auth/utils/logout-handler';
import { AvatarCustom } from '@/core/components/custom/ui/AvatarCustom';
import { IMAGE_AVATAR_USER_ADIMN } from '@/core/assets/image/avatar';

type NavUserProps = {
  systemMenuItems: SystemMenuItem[];
};

type UserInfoProps = {
  user: {
    name: string;
    mobileNumber: string;
    avatar: string;
  };
};

const NavUserComponent = ({ systemMenuItems }: NavUserProps) => {
  const { isMobile, open } = useSidebar();

  const { userData } = useAuthStore((s) => s);
  const userInfoData = userData?.user;

  const user: UserInfoProps['user'] = {
    name: `${userInfoData?.first_name ?? ''} ${userInfoData?.last_name ?? ''}`,
    mobileNumber: userInfoData?.mobile,
    avatar: userInfoData?.avatar,
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="text-sidebar-primary-foreground flex flex-shrink size-8 items-center justify-center rounded-lg">
                <AvatarCustom
                  src={IMAGE_AVATAR_USER_ADIMN || ''}
                  className="size-full bg-contain"
                  imageClassName="bg-contain"
                />
              </div>
              {open && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.mobileNumber}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <AvatarUserCustom
                  src={user?.avatar}
                  className=""
                  gender={userInfoData?.gender}
                  role={
                    rolesDistinction(userData?.roles?.map((item) => item?.title))?.flags?.isAdmin ? 'admin' : 'user'
                  }
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.mobileNumber}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {systemMenuItems
                ?.filter((item) => !item?.disabled)
                ?.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem asChild key={index}>
                      <Link href={item.href} className="flex items-center gap-2">
                        <Icon className="size-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                console.log('call server action logout');
                try {
                  const res = await logoutHandler(); // Server Action
                  console.log('server action result:', res);
                } catch (err) {
                  console.error('logout error:', err);
                }
              }}
            >
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const NavUser = memo(NavUserComponent);

NavUserComponent.displayName = 'NavUser';
