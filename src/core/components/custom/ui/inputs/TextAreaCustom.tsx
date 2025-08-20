'use client';

import { useId, useState } from 'react';
import { Textarea } from '../../../shadcn/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { LabelCustom } from '../LabelCustom';
import { TypographyInputErrorMassage } from '../Typography';
import { cn } from '@/core/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva('overflow-y-auto resize-none', {
  variants: {
    size: {
      sm: 'min-h-[3rem] max-h-[3rem]',
      md: 'min-h-[5rem] max-h-[5rem]',
      lg: 'min-h-[7rem] max-h-[7rem]',
      xl: 'min-h-[9rem] max-h-[9rem]',
      '2xl': 'min-h-[12rem] max-h-[12rem]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props extends VariantProps<typeof textareaVariants> {
  label?: string;
  name: string;
  maxLength?: number;
  className?: string;
}

export function TextareaCustom({ name, maxLength = 500, label, className, size }: Props) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [charCount, setCharCount] = useState(0);
  const errorMessage = (errors?.[name]?.message as string) || null;

  return (
    <div className="*:not-first:mt-2">
      {label && (
        <LabelCustom htmlFor={id} errorMessage={errorMessage}>
          {label}
        </LabelCustom>
      )}
      <Textarea
        {...register(name, {
          maxLength: maxLength,
          onChange: (e) => {
            setCharCount(e.target.value.length);
          },
        })}
        id={id}
        maxLength={maxLength}
        aria-describedby={`${id}-description`}
        className={cn(textareaVariants({ size }), errorMessage && 'input-error', className)}
        style={{ lineHeight: '24px' }}
      />
      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
      <p
        id={`${id}-description`}
        className="text-muted-foreground mt-2 text-right text-xs"
        role="status"
        aria-live="polite"
      >
        {maxLength && (
          <span className="tabular-nums">
            {charCount} کاراکتر از {maxLength}
          </span>
        )}
      </p>
    </div>
  );
}
