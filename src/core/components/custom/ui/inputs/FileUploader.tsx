'use client';

import { FileUpIcon, XIcon } from 'lucide-react';
import { FileMetadata, formatBytes, useFileUpload } from '@/core/hooks/custom/use-file-uload';
import { getFileIcon } from '@/core/utils/iconUtils';
import { Button } from '@/core/components/shadcn/ui/button';
import { JSX, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAuthStore } from '@/core/services/state/auth';
import { getTokensOfTotalFiles } from '@/core/services/api';
import { TypographyInputErrorMassage } from '../Typography';
import { validateNonEmptyArray } from '@/core/utils';

/**
 * Union type for allowed file types in the accept prop.
 */
type FileType =
  | 'image/*' // All image types
  | '.png' // PNG files
  | '.jpg' // JPEG files
  | '.jpeg' // JPEG files
  | '.gif' // GIF files
  | '.pdf' // PDF files
  | '.doc' // Word documents
  | '.docx' // Word documents
  | '.txt' // Text files
  | '.csv' // CSV files
  | 'audio/*' // All audio types
  | 'video/*' // All video types
  | string; // Allow custom file types or MIME types

/**
 * Props for the FileUploader component.
 * @interface Props
 */
interface Props {
  maxUploadSize?: number;
  maxUploadFiles?: number;
  initialFiles?: FileMetadata[];
  accept?: FileType;
  nameInput?: string;
}

/**
 * Formats the accept prop into a human-readable string for UI display.
 * @param {string} [accept] - Comma-separated string of allowed file types (e.g., "image/*,.pdf").
 * @returns {string} A formatted string of allowed file types (e.g., "image, pdf") or "تمامی انواع فایل" if accept is undefined or empty.
 *
 * @example
 * ```tsx
 * formatAccept("image/*,.pdf"); // Returns "image, pdf"
 * formatAccept(".doc,.docx"); // Returns "doc, docx"
 * formatAccept(undefined); // Returns "تمامی انواع فایل"
 * ```
 */
const formatAccept = (accept?: FileType): string => {
  if (!accept) return 'تمامی انواع فایل';
  const types = accept
    .split(',')
    .map((type) => {
      type = type.trim();
      if (!type) return '';
      if (type.startsWith('.')) return type.replace(/^\./, '');
      if (type.includes('/*')) return type.replace('/*', '');
      return type;
    })
    .filter(Boolean);
  return types.length > 0 ? types.join(', ') : 'تمامی انواع فایل';
};

/**
 * A React component for uploading files with drag-and-drop or click-to-select functionality.
 * Supports file type restrictions, size limits, and multiple file uploads.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The file upload interface with drag-and-drop area, file list, and error messages.
 *
 * @example
 * ```tsx
 * // Allow only images and PDFs, max 5 files, max 50MB each
 * <FileUploader
 *   accept="image/*,.pdf"
 *   maxUploadFiles={5}
 *   maxUploadSize={50 * 1024 * 1024}
 *   initialFiles={[]}
 *   nameInput="files"
 * />
 *
 * // Allow all file types
 * <FileUploader maxUploadFiles={5} maxUploadSize={50 * 1024 * 1024} nameInput="files" />
 * ```
 */
export default function FileUploader({
  maxUploadSize,
  maxUploadFiles,
  initialFiles,
  accept,
  nameInput = 'files',
}: Props): JSX.Element {
  const maxSize = maxUploadSize ?? 100 * 1024 * 1024;
  const maxFiles = maxUploadFiles ?? 10;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles,
    accept,
  });

  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors: errorsReactHookForm },
  } = useFormContext();

  const { token } = useAuthStore((state) => state);
  useEffect(() => {
    if (!token) return;
    if (files.length > maxFiles) {
      setValue(nameInput, null);
      return;
    }

    if (validateNonEmptyArray(errors)) {
      errors.forEach((error) => {
        if (error) {
          setError(nameInput, { message: error });
        }
      });
    } else {
      clearErrors(nameInput);
    }

    getTokensOfTotalFiles({ files: files.map((f) => f.file as File), sessionToken: token || '' }).then((tokens) => {
      const valid = tokens.filter((t): t is string => !!t);
      setValue(nameInput, valid.length ? valid : null);
    });
  }, [clearErrors, errors, files, maxFiles, nameInput, token, setError, setValue]);

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="cursor-pointer border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
      >
        <input {...getInputProps()} className="sr-only" aria-label="Upload files" />

        <div className="flex flex-col items-center justify-center text-center  select-none">
          <div
            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <FileUpIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-2.5 text-sm font-medium">بارگزاری فایل</p>
          <p className="text-muted-foreground mb-2 text-xs">
            فایل را <span className="px-1">&quot;بکشید و رها کنید&quot;</span>یا{' '}
            <span className="px-1">&quot;کلیک کنید&quot;</span> تا انتخاب شود
          </p>
          <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
            <span>نوع فایل: {formatAccept(accept)}</span>
            <span>∙</span>
            <span>حداکثر {maxFiles} فایل</span>
            <span>∙</span>
            <span>تا {formatBytes(maxSize)}</span>
          </div>
        </div>
      </div>

      <TypographyInputErrorMassage>{errorsReactHookForm?.[nameInput]?.message as string}</TypographyInputErrorMassage>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                  {getFileIcon(file)}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium">
                    {file.file instanceof File ? file.file.name : file.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(file.file instanceof File ? file.file.size : file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files?.length > 1 && (
            <div>
              <Button size="sm" variant="outline" onClick={clearFiles}>
                حذف تمامی فایل‌ها
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// const formData = new FormData();
//           formData.append('file', file.file);
//           console.log(file.file);
//           const token = await fetchHandler({
//             endpoint: '/upload-file',
//             payload: formData,
//             typeRequest: 'formData',
//             method: 'POST',
//             token: sessionToken,
//           });

//           console.log('🚀 ~ files.map ~ token:', token);
//           return token || null;
