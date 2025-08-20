'use client';

import dynamic from 'next/dynamic';

import { AvatarUserCustom } from '@/core/components/custom/ui/AvatarUserCustom';
import { ButtonIcon } from '@/core/components/custom/ui/Buttons';
import { TooltipCustom } from '@/core/components/custom/ui/TooltipCustom';
import { TypographyMuted } from '@/core/components/custom/ui/Typography';
import { Card } from '@/core/components/shadcn/ui/card';

import { PenIcon } from 'lucide-react';
import { useState } from 'react';

import { MAPPING_GENDER, MAPPING_USER_STATUS } from '@/core/assets/mapping';
import { getUserProfile } from '@/core/services/api/client/clientFetchUserProfile';
import { DashboardSkeleton } from '@/core/features/dashboard/components/blocks';
const FormDialog = dynamic(() => import('./SystemUserProfileFormDialog'));

export function SystemUserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const userProfilResult = getUserProfile();
  const userProfileData = userProfilResult?.data?.data?.profile;

  if (userProfilResult?.isPending) return <DashboardSkeleton />;

  const userData = [
    { label: 'نام کاربری', content: `${userProfileData?.last_name || ''} ${userProfileData?.first_name || ''} ` },
    { label: 'نام پدر', content: userProfileData?.father_name },
    { label: 'شماره موبایل', content: userProfileData?.mobile },
    { label: 'تاریخ تولد', content: userProfileData?.birth_date },
    { label: 'آدرس', content: userProfileData?.address },
    { label: 'مهارت ها', content: userProfileData?.skills },
    { label: 'جنسیت', content: MAPPING_GENDER[userProfileData?.gender] },
    { label: 'وضعیت ثبت نام', content: MAPPING_USER_STATUS[userProfileData?.status] },
    { label: 'درباره وضعیت ثبت نام', content: MAPPING_USER_STATUS[userProfileData?.status_description] },
  ];

  return (
    <Card className="px-5  block max-sm:flex items-center justify-center space-y-9">
      <div className="relative size-fit">
        <AvatarUserCustom gender="male" role="admin" src={userProfileData?.avatar} className="size-32 " />

        <TooltipCustom content="ویرایش پروفایل" delayDuration={400}>
          <ButtonIcon
            className="absolute bottom-0 right-2 lg:left-2 block  rounded-full bg-white/85"
            onClick={() => setIsOpen(true)}
          >
            <PenIcon className="stroke-primary block mx-auto" />
          </ButtonIcon>
        </TooltipCustom>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {userData?.map((item, i) => (
          <li className="" key={`${i}-${item?.label}`}>
            <TypographyMuted className="pr-2 pb-2">{item?.label}</TypographyMuted>
            <div className="p-2.5 border border-ring  text-foreground/90 rounded-lg min-h-12">
              {item?.content || 'تعریف نشده'}
            </div>
          </li>
        ))}
      </ul>

      <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Card>
  );
}
