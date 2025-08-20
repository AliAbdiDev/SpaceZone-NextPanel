import React, { ReactNode } from 'react';
import { Button } from '@/core/components/shadcn/ui/button';
import { cn } from '@/core/utils';
import { TooltipCustom } from './TooltipCustom';
import { LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps extends React.ComponentProps<typeof Button> {
  className?: string;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  tooltipContent?: string;
  tooltipDelayDuration?: number;
}

function ButtonIcon({
  children,
  className,
  variant = 'outline',
  tooltipContent,
  tooltipDelayDuration,
  ...props
}: {
  children: ReactNode;
} & ButtonProps) {
  const buttonElement = (
    <Button type="button" variant={variant} size="icon" {...props} className={cn('size-8', className)}>
      <span className="sr-only">{tooltipContent || 'Button action'}</span>
      {children}
    </Button>
  );

  return tooltipContent ? (
    <TooltipCustom content={tooltipContent} delayDuration={tooltipDelayDuration ?? 0}>
      {buttonElement}
    </TooltipCustom>
  ) : (
    buttonElement
  );
}

function ButtonSubmit({
  isLoading,
  className,
  sizeIcon,
  ...props
}: { isLoading: boolean; className?: string; sizeIcon?: number } & ButtonProps) {
  return (
    <Button {...props} type="submit" disabled={isLoading} className={className}>
      {isLoading && <LoaderCircleIcon className="-ms-1 animate-spin" size={sizeIcon ?? 16} aria-hidden="true" />}
      {'ارسال اطلاعات'}
    </Button>
  );
}
function ButtonLink({
  children,
  href,
  classNameLink,
  ...props
}: { children: ReactNode; href: string; classNameLink?: string } & ButtonProps) {
  return (
    <Link href={href ?? '#'} className={cn('block size-fit', classNameLink)}>
      <Button type="button" {...props}>
        {children}
      </Button>
    </Link>
  );
}

export { ButtonIcon, ButtonSubmit, ButtonLink };
