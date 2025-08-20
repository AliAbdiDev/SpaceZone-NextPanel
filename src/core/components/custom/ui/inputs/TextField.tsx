'use client';

import { Input } from '@/core/components/shadcn/ui/input';
import React, { ChangeEvent, HTMLInputTypeAttribute, useId, useState } from 'react';
import { LabelCustom } from '../LabelCustom';
import { TypographyInputErrorMassage } from '../Typography';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/core/utils';
import { restrictCharCount } from '@/core/utils/restrictCharCount';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  InputClassName?: string;
  label?: string;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  requiredField?: boolean;
}

export const TextField = ({
  className,
  InputClassName,
  label,
  onChange,
  fieldName,
  placeholder,
  maxLength = 300,
  requiredField = false,
  type,
  ...props
}: Props) => {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [charCount, setCharCount] = useState(0);

  if (!fieldName) {
    throw new Error('fieldName is required for TextField component');
  }

  const safeProps = Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (!['onChange', 'name', 'value', 'onBlur'].includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  const errorMessage = (errors?.[fieldName]?.message as string) || null;

  return (
    <div className={cn(className)}>
      <LabelCustom htmlFor={id} errorMessage={errorMessage}>
        {label || ''}
      </LabelCustom>
      <Input
        {...safeProps}
        {...register(fieldName, {
          required: requiredField,
          onChange(e) {
            const inputValue = e.target.value;
            const { isMaxReached, value } = restrictCharCount(inputValue, maxLength);
            setCharCount(value?.length);
            if (isMaxReached) {
              e.target.value = value.slice(0, maxLength);
            }
            if (type === 'number' && +inputValue <= 0) {
              e.target.value = 0;
            }
            onChange?.(e);
          },
          maxLength: {
            value: maxLength,
            message: `حداکثر ${maxLength} کاراکتر مجاز است`,
          },
        })}
        type={type}
        id={id}
        className={cn(
          'w-full',
          InputClassName,
          errorMessage && 'error-input',
          restrictCharCount(charCount.toString(), maxLength).isMaxReached && 'error-input'
        )}
        placeholder={placeholder ?? ''}
      />
      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
    </div>
  );
};
