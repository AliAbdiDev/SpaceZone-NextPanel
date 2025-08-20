'use client';

import React, { useEffect, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/core/components/shadcn/ui/input';
import { Button } from '@/core/components/shadcn/ui/button';
import { LabelCustom } from '../LabelCustom';
import { TypographyInputErrorMassage } from '../Typography';
import { cn } from '@/core/utils';
import { useFileUploader } from '@/core/hooks/custom/useFileUploader';
import { useAuthStore } from '@/core/services/state/auth';

type Mode = 'token' | 'file';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
  requiredField?: boolean;
  accept?: string;
  mode?: Mode; // default: 'token'
  placeholder?: string;
  enableToaster?: boolean; // کنترل توستر
}

export const FileField = ({
  className,
  label,
  onChange,
  fieldName,
  requiredField = false,
  accept,
  mode = 'token',
  placeholder = 'هیچ فایلی انتخاب نشده',
  disabled,
  enableToaster = true,
  ...props
}: Props) => {
  const id = useId();
  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext();

  const { token } = useAuthStore((s) => s);
  const { uploadFile, loading: uploaderLoading } = useFileUploader({
    sessionToken: token || '',
    enableToaster,
  });

  const [fileName, setFileName] = useState<string>(placeholder);

  if (!fieldName) {
    throw new Error('fieldName is required for FileField component');
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

  // ثبت فیلدها و مقدار اولیه از فرم (mount)
  useEffect(() => {
    register(fieldName, { required: requiredField ? 'این فیلد الزامی است' : false });
    register(`${fieldName}_token`);
    register(`${fieldName}_name`);

    const initial = getValues(fieldName);
    const tokenInitial = getValues(`${fieldName}_token`);
    const nameInitial = getValues(`${fieldName}_name`);

    if (initial instanceof File) {
      setFileName(initial.name);
    } else if (typeof initial === 'string' && initial) {
      if (!tokenInitial) {
        setValue(`${fieldName}_token`, initial, { shouldValidate: false, shouldDirty: false });
      }
      if (typeof nameInitial === 'string' && nameInitial) {
        setFileName(nameInitial);
      } else {
        setFileName('فایل انتخاب‌شده');
      }
    } else if (typeof tokenInitial === 'string' && tokenInitial) {
      if (typeof nameInitial === 'string' && nameInitial) {
        setFileName(nameInitial);
      } else {
        setFileName('فایل انتخاب‌شده');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, fieldName, requiredField]);

  // همگام‌سازی با تغییرات فرم از بیرون
  const [watchedValue, watchedName] = watch([fieldName, `${fieldName}_name`]);

  useEffect(() => {
    if (watchedValue instanceof File) {
      setFileName(watchedValue.name);
      return;
    }
    if (typeof watchedName === 'string' && watchedName) {
      setFileName(watchedName);
      return;
    }
    if (typeof watchedValue === 'string' && watchedValue) {
      setFileName('فایل انتخاب‌شده');
      return;
    }
    setFileName(placeholder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValue, watchedName]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    onChange?.(e);

    if (!file) {
      // پاک‌سازی مقادیر فرم بدون استفاده از trigger
      setFileName(placeholder);
      setValue(fieldName, null, { shouldValidate: true, shouldDirty: true });
      setValue(`${fieldName}_token`, null, { shouldValidate: true, shouldDirty: true });
      setValue(`${fieldName}_name`, null, { shouldValidate: false, shouldDirty: true });
      clearErrors(fieldName);
      clearErrors(`${fieldName}_token`);
      return;
    }

    setFileName(file.name);
    clearErrors(fieldName);

    try {
      const token = await uploadFile(file, { showToaster: enableToaster });

      // ذخیره توکن و اسم فایل — بدون trigger
      setValue(`${fieldName}_token`, token, { shouldValidate: true, shouldDirty: true });
      setValue(`${fieldName}_name`, file.name, { shouldValidate: false, shouldDirty: true });

      if (token == null) {
        setError(fieldName, { type: 'upload', message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
        return;
      }

      if (mode === 'token') {
        setValue(fieldName, token, { shouldValidate: true, shouldDirty: true });
      } else {
        setValue(fieldName, file, { shouldValidate: true, shouldDirty: true });
      }
    } catch {
      setError(fieldName, { type: 'upload', message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' });
    }
  }

  const isLoading = uploaderLoading;

  return (
    <div className={cn(className)}>
      <LabelCustom htmlFor={id} errorMessage={errorMessage}>
        {label || ''}
      </LabelCustom>

      <div className="flex items-center gap-2  bg-input/15 rounded-md">
        <Input
          {...safeProps}
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
          disabled={disabled || isLoading}
        />

        <Button variant="outline" asChild>
          <label htmlFor={id} className="cursor-pointer select-none">
            {isLoading ? 'در حال آپلود...' : 'انتخاب فایل'}
          </label>
        </Button>

        <span className="text-sm text-muted-foreground max-w-[40ch] truncate">{fileName}</span>
      </div>

      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
    </div>
  );
};
