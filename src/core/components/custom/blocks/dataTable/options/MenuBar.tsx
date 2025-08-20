'use client';

import { Separator } from '@/core/components/shadcn/ui/separator';
import { Trash2Icon, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table } from '@tanstack/react-table';
import { toast } from 'sonner';
import { ButtonIcon } from '../../../ui/Buttons';
import { useCsvExport } from '@/core/hooks/custom/dataTable/useCvsExport';
import { toSafeString } from '@/core/utils';

interface MenuBarProps<TData> {
  table: Table<TData>;
  onDelete?: (selectedRows: TData[]) => void;
}

/**
 * A floating toolbar for table actions such as downloading selected rows as CSV and deleting rows.
 * @param table - TanStack Table instance
 * @param onDelete - Optional callback for handling row deletion
 */
export function MenuBar<TData>({ table, onDelete }: MenuBarProps<TData>) {
  const selected = table.getSelectedRowModel().rows.map((r) => r?.original);
  const allRows = table.getRowModel().rows.map((r) => r?.original);

  // Build headers, excluding non-data columns like 'select' and 'actions'
  const headers = table
    .getAllColumns()
    .filter(
      (col) =>
        col.id !== 'select' && col.id !== 'actions' && ('accessorKey' in col.columnDef || 'accessorFn' in col.columnDef)
    )
    .map((col) => ({
      key: col.id as keyof TData,
      label: col.columnDef.meta?.title
        ? toSafeString(col.columnDef.meta.title, { stripHtml: true })
        : toSafeString(col.columnDef.header, { stripHtml: true }) || col.id,
    }));

  const tooltipDelay = 200;
  const buttonClassName = 'size-7 p-1.5 bg-transparent rounded-sm border-none';

  const rowsToExport = selected.length > 0 ? selected : allRows;
  const { blobUrl, handleDownload, filename } = useCsvExport(rowsToExport, headers, {
    errorText: 'هیچ ردیفی برای خروجی وجود ندارد.',
    successText: `${rowsToExport?.length} ردیف با موفقیت آماده دانلود شد`,
    filename: 'agroyar_table_export.csv',
    encoding: 'utf-8',
    useBOM: true,
  });

  const onClickDownload = () => {
    const { message, isError } = handleDownload();
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const onClickDelete = () => {
    if (onDelete && selected.length > 0) {
      onDelete(selected);
      toast.success(`${selected.length} ردیف با موفقیت حذف شد`);
      table.resetRowSelection();
    } else {
      toast.error('هیچ ردیفی برای حذف انتخاب نشده است');
    }
  };

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          className="bg-background shadow-md fixed bottom-5 left-1/2 transform -translate-x-1/2 min-w-[15rem] rounded-md flex items-center justify-end gap-1.5 px-3 py-2.5 border border-accent text-xs"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'backInOut' }}
        >
          <ButtonIcon
            tooltipDelayDuration={tooltipDelay}
            tooltipContent="حذف موارد انتخاب‌شده"
            className={buttonClassName}
            onClick={onClickDelete}
          >
            <Trash2Icon />
          </ButtonIcon>

          {blobUrl ? (
            <ButtonIcon
              tooltipDelayDuration={tooltipDelay}
              tooltipContent={`دانلود ${selected?.length} ردیف با فرمت CSV`}
              className={buttonClassName}
            >
              <a
                href={blobUrl}
                download={filename}
                onClick={onClickDownload}
                className="size-full flex items-center justify-center"
              >
                <Download />
              </a>
            </ButtonIcon>
          ) : (
            <ButtonIcon
              tooltipDelayDuration={tooltipDelay}
              tooltipContent="دانلود غیرفعال است"
              className={buttonClassName}
              disabled
            >
              <Download />
            </ButtonIcon>
          )}

          <span className="flex items-center gap-1 pe-1">
            <ButtonIcon
              className={buttonClassName}
              onClick={() => table.resetRowSelection()}
              tooltipDelayDuration={tooltipDelay}
              tooltipContent="لغو انتخاب"
            >
              <X />
            </ButtonIcon>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm">انتخاب‌شده: {selected.length}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
