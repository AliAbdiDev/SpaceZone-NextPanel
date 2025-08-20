'use client';
import { TableProps } from '@/core/assets/types';
import { TableHead, TableHeader, TableRow } from '@/core/components/shadcn/ui/table';
import { flexRender } from '@tanstack/react-table';

function DataTableHeader<TData>({ table }: Pick<TableProps<TData>, 'table'>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup?.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header?.id} className="text-start">
                {header?.isPlaceholder ? null : flexRender(header?.column?.columnDef?.header, header?.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default DataTableHeader;
