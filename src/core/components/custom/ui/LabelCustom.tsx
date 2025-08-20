import { cn } from '@/core/utils';
import React, { ReactNode } from 'react';
import { Label } from '../../shadcn/ui/label';

export function LabelCustom({
  children,
  errorMessage,
  classNameLabel,
  ...props
}: { children: ReactNode; errorMessage?: string; classNameLabel?: string } & Omit<
  React.ComponentProps<typeof Label>,
  'className'
>) {
  return (
    <Label
      className={cn(
        'cursor-pointer pb-[9px] ps-0.5 inline-block',
        { 'text-destructive': errorMessage },
        classNameLabel
      )}
      {...props}
    >
      {children}
    </Label>
  );
}
