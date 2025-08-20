import { TableProps } from '@/core/assets/types';
import { TableBody, TableCell, TableRow } from '@/core/components/shadcn/ui/table';
import { flexRender } from '@tanstack/react-table';

function DataTableBody<TData>({ table, columns }: TableProps<TData>) {
  return (
    <TableBody className="">
      {table.getRowModel()?.rows?.length ? (
        table.getRowModel()?.rows.map((row) => (
          <TableRow key={row.id} data-state={row?.getIsSelected() && 'selected'} className="odd:bg-accent/65">
            {row.getVisibleCells().map((cell) => {
              return (
                <TableCell key={cell.id} className="py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext()) ?? 'اطلاعات موجود نیست'}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns?.length} className="h-24 text-center">
            هیچ نتیجه‌ای یافت نشد.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default DataTableBody;
