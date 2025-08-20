import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../shadcn/ui/tooltip';
import { HoverCard, HoverCardContent } from '../../shadcn/ui/hover-card';
import { cn } from '@/core/utils';
import { ReactNode } from 'react';
import { HoverCardTrigger } from '@radix-ui/react-hover-card';

interface Props extends React.ComponentProps<typeof Tooltip> {
  content: React.ReactNode;
  children: React.ReactNode;
}
export function TooltipCustom({ content, children, ...props }: Props) {
  return (
    <Tooltip {...props} disableHoverableContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}

interface TooltipHoverCardProps {
  childrenTrigger: ReactNode;
  childrenContent: ReactNode;
  classNameContent?: string;
  propertyHoverCardContent?: React.ComponentProps<typeof HoverCardContent>;
}

export function TooltipHoverCard({
  childrenTrigger,
  childrenContent,
  classNameContent,
  propertyHoverCardContent,
}: TooltipHoverCardProps) {
  return (
    <HoverCard openDelay={170} closeDelay={100}>
      <HoverCardTrigger asChild>{childrenTrigger}</HoverCardTrigger>
      <HoverCardContent className={cn('p-2 size-fit', classNameContent)} {...propertyHoverCardContent}>
        {childrenContent}
      </HoverCardContent>
    </HoverCard>
  );
}
