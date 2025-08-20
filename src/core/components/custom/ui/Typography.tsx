import { cn } from '@/core/utils';
import { ReactNode, HTMLAttributes } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

interface ListItem {
  id?: string | number;
  content: string;
}

function TypographyH1({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-3xl lg:text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
      {...props}
    >
      {children || 'Lorem ipsum dolor'}
    </h1>
  );
}

function TypographyH2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn('scroll-m-20  pb-2 text-2xl lg:text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    >
      {children || 'Sit amet consectetur'}
    </h2>
  );
}

function TypographyH3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props}>
      {children || 'Adipiscing elit'}
    </h3>
  );
}

function TypographyH4({ children, className, ...props }: TypographyProps) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props}>
      {children || 'Sed do eiusmod'}
    </h4>
  );
}

function TypographyP({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
      {children || 'Lorem ipsum dolor sit amet consectetur adipiscing.'}
    </p>
  );
}

function TypographyList({
  listItems,
  className,
  ...props
}: { listItems?: ListItem[] | string[] } & HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {listItems?.map((item: ListItem | string, index: number) => (
        <li key={typeof item === 'string' ? index : (item.id ?? index)}>
          {typeof item === 'string' ? item : item.content}
        </li>
      ))}
    </ul>
  );
}

function TypographyLead({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn(className, 'text-foreground leading-7')} {...props}>
      {children || 'Dolor sit amet consectetur adipiscing elit.'}
    </p>
  );
}

function TypographyLarge({ children, className, ...props }: TypographyProps) {
  return (
    <div className={cn('text-lg font-semibold', className)} {...props}>
      {children || 'Eiusmod tempor'}
    </div>
  );
}

function TypographySmall({ children, className, ...props }: TypographyProps) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)} {...props}>
      {children || 'Incididunt ut'}
    </small>
  );
}

function TypographyMuted({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props}>
      {children || 'Labore et dolore'}
    </p>
  );
}

function TypographyInputErrorMassage({ children, className, ...props }: TypographyProps) {
  return (
    children && (
      <p className={cn(className, 'text-destructive text-xs pt-1 ps-0.5')} {...props}>
        {children}
      </p>
    )
  );
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyList,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyInputErrorMassage,
};
