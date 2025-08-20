'use client';

import { Button } from '@/core/components/shadcn/ui/button';
import { useFileUpload } from '@/core/hooks/custom/use-file-uload';
import { getTokenOfFile } from '@/core/services/api';
import { useAuthStore } from '@/core/services/state/auth';
import { cn, validateNonEmptyArray } from '@/core/utils';
import { convertSizeFileFormat } from '@/core/utils/bytesToFormat';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { TypographyInputErrorMassage } from './Typography';

interface BasicImgUploaderProps {
  onPreviewChange?: (previewUrl: string | null) => void;
  name: string;
  maxSize?: number;
  className?: string;
}

export function BasicImgUploader({
  onPreviewChange,
  name,
  maxSize = convertSizeFileFormat(10, 'MB', 'Bytes'),
  className,
}: BasicImgUploaderProps) {
  const [{ files, errors }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
    maxSize: maxSize || Infinity,
  });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;
  const fileId = files[0]?.id || null;

  const {
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors: errorsReactHookForm },
  } = useFormContext();

  const { token } = useAuthStore((state) => state);

  useEffect(() => {
    const imgFile = previewUrl && files?.[0]?.file instanceof File ? files[0].file : null;

    if (validateNonEmptyArray(errors)) {
      errors.forEach((error) => {
        if (error) {
          setError(name, { message: error });
        }
      });
    } else {
      clearErrors(name);
    }

    onPreviewChange?.(previewUrl);

    if (imgFile && { token }) {
      getTokenOfFile({ file: imgFile, fileName: name, sessionToken: token || '' })
        .then((token) => {
          setValue(name, token, { shouldValidate: true, shouldDirty: true });
          console.log('Form value after setValue:', watch(name));
        })
        .catch((err) => {
          console.error('getTokenOfFile error:', err);
          setError(name, { message: 'خطا در دریافت توکن' });
        });
    } else {
      console.warn('Invalid file or sessionToken');
    }
  }, [clearErrors, errors, files, name, onPreviewChange, previewUrl, token, setError, setValue, watch]);

  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      <div className="inline-flex items-center gap-2 align-top">
        <div className="relative inline-block">
          <Button type="button" onClick={openFileDialog} aria-haspopup="dialog">
            {fileName ? 'تغییر تصویر' : 'آپلود تصویر'}
          </Button>
          <input {...getInputProps()} className="sr-only" aria-label="آپلود فایل تصویر" tabIndex={-1} />
        </div>
      </div>
      {fileName && fileId && (
        <div className="inline-flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => removeFile(fileId)}
            className="text-destructive font-medium hover:underline"
            aria-label={`حذف ${fileName}`}
          >
            حذف
          </button>
          <p className="text-muted-foreground truncate max-w-72" aria-live="polite">
            {fileName}
          </p>
        </div>
      )}
      <TypographyInputErrorMassage>{errorsReactHookForm?.[name]?.message as string}</TypographyInputErrorMassage>
    </div>
  );
}
