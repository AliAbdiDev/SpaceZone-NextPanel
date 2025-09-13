'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BadgeCustom } from '@/core/components/custom/ui/BadgeCustom';
import { UserInfoCell } from '@/core/components/custom/blocks/dataTable/cell/UserInfoCell';
import { User } from '@/core/assets/types/entities';
import { MAPPING_ROLES } from '@/core/assets/mapping';
import { selectRowCol } from '@/core/components/custom/blocks/dataTable/options/SelectRowCol';
import { actionCell } from '@/core/components/custom/blocks/dataTable/cell/actionCell';

import DropdownMenuCustomDashboard from '@/core/features/dashboard/components/blocks/DropdownMenuDashboardCustom';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { encodeDataForUrl } from '@/core/utils';

const ChangeUserRoleDialog = dynamic(() => import('@/core/features/dashboard/components/blocks/ChangeUserRoleDialog'), {
  ssr: false,
});

const ActionComponent = ({ row }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = row?.original;
  return (
    <>
      <DropdownMenuCustomDashboard
        editMenuItem={{ linkUrl: `edit?user_id=${user?.id}` }}
        menuItems={[
          {
            menuItem: 'پروفایل',
            linkUrl: `profile?user_id=${user?.id}`,
          },
          {
            menuItem: 'تغییر نقش',
            linkUrl: `?user_id=${user?.id}&user_name=${encodeDataForUrl(`${user?.first_name || ''} ${user?.last_name || ''}`)}`,
            propertys: {
              onClick() {
                setOpenDialog(true);
              },
            },
          },
        ]}
      />
      <ChangeUserRoleDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export const userColumns: ColumnDef<Partial<User>>[] = [
  {
    accessorKey: 'name',
    header: () => 'نام کاربری',
    meta: { title: 'نام کاربری' },
    cell({ row }) {
      const user = row?.original;

      return (
        <UserInfoCell
          avatarSrc={user.avatar}
          gender={user?.gender}
          name={`${user?.first_name} ${user?.last_name}`}
          role={MAPPING_ROLES[user?.role?.toLocaleLowerCase() || 'admin']}
        />
      );
    },
  },
  {
    accessorKey: 'role',
    header: () => 'نقش',
    meta: { title: 'نقش' },
    cell: ({ row }) => {
      const user = row?.original;
      return MAPPING_ROLES[user?.role?.toLocaleLowerCase() || 'admin'];
    },
  },
  {
    accessorKey: 'national_code',
    header: () => 'شماره ملی',
    meta: { title: 'شماره ملی' },
  },
  {
    accessorKey: 'mobile',
    header: () => 'شماره همراه',
    meta: { title: 'شماره همراه' },
  },
  {
    accessorKey: 'status',
    header: () => 'وضعیت',
    cell: ({ row }) => <BadgeCustom status={row.getValue('status')} />,
    meta: { title: 'وضعیت' },
  },
  actionCell({
    ActionComponent: ActionComponent,
  }),

  selectRowCol(),
];
