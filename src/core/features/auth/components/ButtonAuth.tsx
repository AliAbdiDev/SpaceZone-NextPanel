import { ButtonSubmit } from '@/core/components/custom/ui/Buttons';
import { cn } from '@/core/utils';
import React from 'react';

export default function ButtonAuth({
  label,
  isLoading = false,
  className,
  ...props
}: { label: string; isLoading: boolean; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonSubmit className={cn(className, 'text-lg w-full mt-7')} isLoading={isLoading} {...props}>
      {isLoading ? `درحال ${label} ...` : label}
    </ButtonSubmit>
  );
}
