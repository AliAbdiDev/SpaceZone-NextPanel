import { cn } from '@/core/utils/shadcn/utils';

function Skeleton({ className: className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="skeleton" className={cn('bg-accent animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
