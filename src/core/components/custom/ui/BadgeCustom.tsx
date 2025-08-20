import { Badge } from '../../shadcn/ui/badge';

const defaultBadgeMap: BadgeMap = {
  active: {
    label: 'فعال',
    variant: 'default',
  },
  inactive: {
    label: 'غیرفعال',
    variant: 'destructive',
  },
  pending: {
    label: 'در حال انتظار',
    variant: 'outline',
  },
};

export type BadgeConfig = {
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  className?: string;
};

export type BadgeMap = Record<string, BadgeConfig>;

interface BadgeMapComponentProps {
  status: string;
  badgeMap?: BadgeMap;
}

export const BadgeCustom = ({ status, badgeMap = defaultBadgeMap }: BadgeMapComponentProps) => {
  if (!status || !badgeMap[status]) return null;

  const { label, variant, className } = badgeMap[status];

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};
