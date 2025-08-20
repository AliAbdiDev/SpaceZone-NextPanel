import React from 'react';
import { AvatarUserCustom } from '@/core/components/custom/ui/AvatarUserCustom';
import { TypographyMuted } from '../../../ui/Typography';
import { AvatarCustom } from '../../../ui/AvatarCustom';

type Avatar = React.ComponentProps<typeof AvatarUserCustom>;
interface UserInfoCellProps extends Pick<Avatar, 'gender' | 'role'> {
  name: string;
  avatarSrc: string;
}

export function UserInfoCell({ name, role, avatarSrc }: UserInfoCellProps) {
  return (
    <div className="flex items-center justify-start gap-2 w-full">
      <AvatarCustom src={avatarSrc} />
      <div>
        <div className="font-medium">{name}</div>
        <TypographyMuted className="text-sm">{role}</TypographyMuted>
      </div>
    </div>
  );
}
