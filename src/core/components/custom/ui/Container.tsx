import { cn } from '@/core/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}
function GridContainer({ children, className }: ContainerProps) {
  return <section className={cn('grid grid-cols-1 sm:grid-cols-2 gap-5 w-full', className)}>{children}</section>;
}

export { GridContainer };
