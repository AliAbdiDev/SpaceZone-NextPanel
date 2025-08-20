import { Avatar, AvatarImage } from '../../shadcn/ui/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/utils';

export const avatarVariants = cva('w-[4.2rem] h-16 bg-accent border border-input', {
  variants: {
    variant: {
      default: 'rounded-full',
      primary: 'rounded-sm',
      secondary: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export function AvatarCustom({
  src,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disabledToken = false,
  variant = 'default',
  loading,
}: {
  src: string;
  className?: string;
  disabledToken?: boolean;
  loading?: 'eager' | 'lazy';
} & AvatarVariantProps) {
  const avatarSrc = src ?? '/avatar/femaleAdmin.png';

  return (
    <Avatar className={cn(avatarVariants({ variant }), className)}>
      <AvatarImage src={avatarSrc} alt="تصویر" loading={loading ?? 'lazy'} className="bg-cover" />
    </Avatar>
  );
}
