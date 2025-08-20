'use client';

import React, { useId, memo, useCallback, useMemo } from 'react';
import { useFormContext, useController, RegisterOptions } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../../shadcn/ui/popover';
import { Input } from '../../shadcn/ui/input';
import { cn } from '@/core/utils';
import { CalendarHijri } from '../../shadcn/ui/calender';
import { TypographyInputErrorMassage } from '../ui/Typography';
import { DatePickerMode, DateValue } from '@/core/assets/types/date';
import { formatDate, parseDate } from '@/core/utils/date-picker';
import { LabelCustom } from '../ui/LabelCustom';

interface DatePickerProps {
  name: string;
  mode?: DatePickerMode;
  label?: string;
  className?: string;
  placeholder?: string;
  requiredField?: boolean;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  name,
  mode = 'single',
  label = 'انتخاب تاریخ',
  className,
  placeholder = 'انتخاب تاریخ',
  requiredField = false,
}) => {
  const id = useId();
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: requiredField,
    } as RegisterOptions,
  });

  const { value, onChange } = field;
  const errorMessage = fieldState.error?.message || '';

  // Format the value for display (Jalali)
  const formattedValue = useMemo(() => {
    return formatDate(value as DateValue | undefined, mode);
  }, [value, mode]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseDate(e.target.value, mode);
      onChange(parsed ?? null);
    },
    [onChange, mode]
  );

  return (
    <div className="w-full">
      <LabelCustom htmlFor={id} errorMessage={errorMessage}>
        {label}
      </LabelCustom>

      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <div className={'relative flex items-center'}>
            <Input
              id={id}
              type="text"
              value={formattedValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              aria-label={label}
              readOnly
              className={cn('w-full text-right pr-10', className, errorMessage && 'input-error')}
            />
            <CalendarIcon
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/80 hover:text-foreground transition-colors"
              aria-hidden="true"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent dir="rtl" className="p-0 w-fit shadow-none border-none" align="start">
          <CalendarHijri mode={mode} name={name} />
        </PopoverContent>
      </Popover>

      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
    </div>
  );
};

export const DatePickerField = memo(DatePickerComponent);
DatePickerComponent.displayName = 'DatePicker';
