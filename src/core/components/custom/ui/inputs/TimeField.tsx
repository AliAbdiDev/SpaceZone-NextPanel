'use client';

import { useId } from 'react';
import { Input } from '@/core/components/shadcn/ui/input';
import { LabelCustom } from '../LabelCustom';
import { TypographyInputErrorMassage } from '../Typography';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/core/utils';

export function TimeField({
  label,
  name,
  classNameInput,
  ...props
}: { label?: string; name: string; classNameInput?: string } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
>) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors?.[name]?.message as string) || null;
  return (
    <div className="w-full">
      {label && (
        <LabelCustom htmlFor={id} errorMessage={errorMessage}>
          {label}
        </LabelCustom>
      )}
      <Input
        {...register(name)}
        id={id}
        type="time"
        className={cn('peer w-full appearance-none time-input-no-picker', classNameInput)}
        {...props}
      />
      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
    </div>
  );
}

export default TimeField;
