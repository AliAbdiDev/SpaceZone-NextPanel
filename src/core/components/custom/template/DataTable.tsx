'use client';

import { ColumnDef } from '@tanstack/react-table';
import DataTableHeader from '../blocks/dataTable/foundation/DataTableHeader';
import DataTableBody from '../blocks/dataTable/foundation/DataTableBody';
import { Pagination } from '../blocks/dataTable/options/Pagination';
import { Table } from '@/core/components/shadcn/ui/table';
import { useDataTable } from '@/core/hooks/custom';
import { Visibility } from '../blocks/dataTable/options/Visibility';
import { MenuBar } from '../blocks/dataTable/options/MenuBar';
import { Button } from '../../shadcn/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';
import { validateNonEmptyArray } from '@/core/utils';
import { TableMeta } from '@/core/assets/types';

type FilterType =
  | 'auto'
  | 'includes'
  | 'startsWith'
  | 'exact'
  | ((row: any, columnId: string, filterValue: string) => boolean);

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: {
    inactive?: boolean;
    filterType?: FilterType;
    disableGlobalFilter?: boolean;
    disableColumnFilter?: boolean;
  };
  actionButton?: { className?: string; href?: string; label?: string; children?: ReactNode } & React.ComponentProps<
    typeof Button
  >;
  isActiveVisibility?: boolean;
  rowCounterDisabled?: boolean;
  meta?: TableMeta;
  isLoading?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  // filters = { isActive: true, filterType: 'auto' },
  isActiveVisibility = true,
  actionButton,
  meta,
  isLoading,
  rowCounterDisabled = false,
}: DataTableProps<TData, TValue>) {
  const tabelData = validateNonEmptyArray(data) ?? [];

  const { table } = useDataTable<TData, TValue>({
    columns,
    data: tabelData,
    meta: meta || {
      current_page: 1,
      per_page: 1,
      total: 0,
      last_page: 1,
    },
  });

  return (
    <section className="max-w-7xl w-full mx-auto">
      <div className="w-full flex items-center justify-between py-4 px-1">
        <span className="flex items-center justify-center gap-3">
          {/* {filters?.isActive && (
            <RowFilters
              table={table}
              setGlobalFilter={setGlobalFilter}
              disableGlobalFilter={filters.disableGlobalFilter}
              disableColumnFilter={filters.disableColumnFilter}
            />
          )} */}
          {isActiveVisibility && <Visibility table={table} />}
        </span>

        <span>
          {actionButton && (
            <Link href={actionButton.href || '#'}>
              <Button {...actionButton} variant="default">
                {actionButton.children}
              </Button>
            </Link>
          )}
        </span>
      </div>

      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          {isLoading ? (
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td colSpan={columns?.length}>
                    <div className="h-16 bg-primary/15 dark:bg-gray-700 w-full my-1 mx-2 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : tabelData.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  داده‌ای یافت نشد
                </td>
              </tr>
            </tbody>
          ) : (
            <DataTableBody table={table} columns={columns} />
          )}
        </Table>
      </div>

      <div className="flex items-center justify-between px-2 pt-3">
        {rowCounterDisabled ? (
          <span />
        ) : (
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel()?.rows?.length} از {table.getFilteredRowModel()?.rows?.length} ردیف
            انتخاب شده است
          </div>
        )}
        <Pagination table={table} />
      </div>
      <MenuBar table={table} />
    </section>
  );
}
