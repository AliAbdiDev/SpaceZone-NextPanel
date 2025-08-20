import { cn } from '@/core/utils';
import { Avatar, AvatarImage } from '../../shadcn/ui/avatar';

const MAPPING_AVATAR_IMG: Record<string, string> = {
  femaleAdmin: '/common/avatar/femaleAdmin.png',
  femaleUser: '/common/avatar/femaleUser.png',
  maleAdmin: '/common/avatar/maleAdmin.png',
  maleUser: '/common/avatar/maleUser.png',
};

type AvatarUserCustomProps = {
  gender: 'male' | 'female';
  role: 'admin' | 'user';
  className?: string;
  src: string;
};

export function AvatarUserCustom({ gender, role, className, src }: AvatarUserCustomProps) {
  const key = `${gender?.toLowerCase()}${role?.charAt(0)?.toUpperCase() + role?.slice(1)?.toLowerCase()}`;

  const avatarSrc = src ?? MAPPING_AVATAR_IMG[key] ?? MAPPING_AVATAR_IMG['maleAdmin'];

  return (
    <Avatar className={cn('size-14 bg-accent', className)}>
      <AvatarImage src={avatarSrc} alt={`${gender}-${role}`} width={30} height={30} loading="lazy" />
    </Avatar>
  );
}
