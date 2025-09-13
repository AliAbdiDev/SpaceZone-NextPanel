'use client';

import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/core/components/shadcn/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/core/components/shadcn/ui/sidebar';
import { useEffect, useState } from 'react';
import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { cn } from '@/core/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RoleSwitcherItem } from '../../assets/types';
import { IMAGE_AVATAR_USER_ADIMN } from '@/core/assets/image/avatar';

const RoleImage = ({ src }: { src: string }) => (
  <ImgNormalCustom alt="نقش کاربر" src={src} fill className="object-cover" priority />
);

const userRolesItem: RoleSwitcherItem[] = [
  {
    name: 'ادمین',
    image: IMAGE_AVATAR_USER_ADIMN,
    hrefLink: '/panel',
    role: 'admin',
  },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const RoleSwitcher = () => {
  const { isMobile, open } = useSidebar();
  const [activeRole, setActiveRole] = useState<RoleSwitcherItem | null>(null);
  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    const matchedRole = userRolesItem?.find((role) => currentPath?.startsWith(role?.hrefLink));
    setActiveRole(matchedRole || userRolesItem?.[0]);
  }, [currentPath]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.length === 1) {
        const key = event.key.toUpperCase();
        const keyIndex = alphabet.indexOf(key);
        if (keyIndex !== -1 && keyIndex < userRolesItem.length) {
          setActiveRole(userRolesItem[keyIndex]);
          router.push(userRolesItem[keyIndex].hrefLink);
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, [router]);

  if (!activeRole) {
    return <div className="h-12 rounded-md w-full bg-accent/70 animate-pulse" />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="bg-accent text-sidebar-primary-foreground flex flex-shrink aspect-square size-8 items-center justify-center rounded-lg relative overflow-hidden">
                <RoleImage src={activeRole.image} />
              </div>

              <div className={cn('grid flex-1 text-left text-sm leading-tight', { hidden: !open })}>
                <span className="truncate font-medium">{activeRole.name}</span>
              </div>

              <ChevronsUpDown className={cn('ml-auto', { hidden: !open })} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs text-right">نقش‌ها</DropdownMenuLabel>
            {userRolesItem.map((role, index) => (
              <DropdownMenuItem
                key={`${role?.name}-${index}`}
                onClick={() => {
                  setActiveRole(role);
                  router.push(role?.hrefLink);
                }}
                className="cursor-pointer p-0"
              >
                <Link href={role?.hrefLink ?? '#'} className="flex items-center size-full gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border relative overflow-hidden">
                    <RoleImage src={role.image} />
                  </div>
                  <span>{role?.name}</span>
                  {index < alphabet.length && <DropdownMenuShortcut>Alt+{alphabet[index]}</DropdownMenuShortcut>}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
