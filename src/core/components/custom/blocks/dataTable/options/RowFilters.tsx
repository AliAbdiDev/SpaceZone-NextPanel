'use client';

import { Input } from '@/core/components/shadcn/ui/input';
import { Table } from '@tanstack/react-table';
import { Filter, X } from 'lucide-react';
import { Button } from '@/core/components/shadcn/ui/button';
import { Checkbox } from '@/core/components/shadcn/ui/checkbox';
import { useState } from 'react';
import { useTableFilters } from '@/core/hooks/custom';
import { Popover, PopoverContent, PopoverTrigger } from '@/core/components/shadcn/ui/popover';
import { Label } from '@/core/components/shadcn/ui/label';
import { TabsCustom, TabItem } from '@/core/components/custom/blocks/TabsCustom';
import { ScrollArea } from '@/core/components/shadcn/ui/scroll-area';
import { TypographyMuted } from '../../../ui/Typography';

interface RowFiltersProps<TData> {
  table: Table<TData>;
  setGlobalFilter: (value: string) => void;
  disableGlobalFilter?: boolean;
  disableColumnFilter?: boolean;
}

export function RowFilters<TData>({
  table,
  setGlobalFilter,
  disableGlobalFilter = false,
  disableColumnFilter = false,
}: RowFiltersProps<TData>) {
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const {
    selectedFilter,
    headerTitle,
    availableFilterColumns,
    handleFilterChange,
    handleClearFilter,
    toggleAllNone,
    filterMode,
    setFilterMode,
  } = useTableFilters<TData>({
    table,
    setGlobalFilter,
    disableGlobalFilter,
    disableColumnFilter,
    open,
  });

  const tabsProps: TabItem[] = [
    {
      title: 'سراسری',
      value: 'global',
      content: <TypographyMuted>فیلتر سراسری فعال است</TypographyMuted>,
    },
    {
      title: 'ستونی',
      value: 'column',
      content: (
        <div className="flex flex-col space-y-2">
          <ScrollArea className="max-h-[200px] w-full overflow-y-auto">
            {availableFilterColumns?.map((colId) => {
              const col = table.getColumn(colId)!;
              return (
                <div key={colId} className="flex items-center space-x-3 not-first:mt-1 py-1">
                  <Checkbox
                    id={colId}
                    checked={selectedFilter.includes(colId)}
                    onCheckedChange={(checked) => {
                      toggleAllNone(value, !!checked, colId);
                    }}
                    className="border-gray-500 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500"
                  />
                  <Label htmlFor={colId} className="text-sm capitalize">
                    {col.columnDef.meta?.title ?? colId}
                  </Label>
                </div>
              );
            })}
          </ScrollArea>
        </div>
      ),
    },
  ].filter((tab) => {
    if (disableGlobalFilter && tab.value === 'global') return false;
    if (disableColumnFilter && tab.value === 'column') return false;
    return true;
  });

  return (
    <div className="relative max-w-md w-full flex justify-center items-center gap-2">
      <div className="relative w-full">
        <Input
          className="peer pe-10 ps-4"
          placeholder={headerTitle}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            setValue(value);
            handleFilterChange(value);
          }}
          type="search"
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground transition-colors outline-none"
          aria-label="Clear search"
          type="button"
          onClick={() => {
            setValue('');
            handleClearFilter();
          }}
          disabled={!value}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex items-center gap-1">
            <Filter />
            فیلتر
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className=" max-w-[200px] p-4">
          <TabsCustom
            onValueChange={(value) => {
              console.log('🚀 ~ value:', value);
              setFilterMode!(value as 'global' | 'column' | 'auto');
            }}
            tabs={tabsProps}
            defaultValue={filterMode === 'global' ? 'global' : 'column'}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
