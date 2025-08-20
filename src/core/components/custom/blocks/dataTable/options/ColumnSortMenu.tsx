import { Button } from '@/core/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/shadcn/ui/dropdown-menu';
import { cn } from '@/core/utils';
import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, X } from 'lucide-react';

interface ColumnSortMenuProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * ColumnSortMenu.jsx
 * A dropdown menu for sorting DataTable columns (ascending, descending, or clearing sort).
 * Used as a core feature in the DataTable component.
 */
export function ColumnSortMenu<TData, TValue>({
  column: { getCanSort, getIsSorted, toggleSorting, clearSorting },
  title,
  className,
}: ColumnSortMenuProps<TData, TValue>) {
  if (!getCanSort) {
    return <div className={className}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
            <span>{title}</span>
            {getIsSorted() === 'desc' ? <ArrowDown /> : getIsSorted() === 'asc' ? <ArrowUp /> : <ChevronsUpDown />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => toggleSorting(false)}>
            <ArrowUp />
            صعودی
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSorting(true)}>
            <ArrowDown />
            نزولی
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => clearSorting()}>
            <X />
            حذف مرتب سازی
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
