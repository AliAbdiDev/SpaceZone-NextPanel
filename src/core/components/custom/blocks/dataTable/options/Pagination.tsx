import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/core/components/shadcn/ui/select';
import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ButtonIcon } from '@/core/components/custom/ui/Buttons';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const pageSizeData = [10, 20, 25, 30, 40, 50];

  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      {table?.getFilteredRowModel()?.rows?.length >= 0 && (
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">تعداد ردیف صفحات</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeData?.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        صفحه {!isNaN(table.getState().pagination.pageIndex + 1) ? table.getState().pagination.pageIndex + 1 : 1} از{' '}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
        <ButtonIcon
          className="hidden lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">رفتن به صفحه اول</span>
          <ChevronsRight />
        </ButtonIcon>
        <ButtonIcon onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">رفتن به صفحه قبلی</span>
          <ChevronRight />
        </ButtonIcon>
        <ButtonIcon onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <span className="sr-only">رفتن به صفحه بعدی</span>
          <ChevronLeft />
        </ButtonIcon>
        <ButtonIcon
          className="hidden lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">رفتن به صفحه آخر</span>
          <ChevronsLeft />
        </ButtonIcon>
      </div>
    </div>
  );
}
