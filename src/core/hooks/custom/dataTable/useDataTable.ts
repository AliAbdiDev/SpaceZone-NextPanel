import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useGetPaginationParams, useSetPaginationParams } from '../usePaginationParam';


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export function useDataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
    const { columns, data, meta } = props;

    const { page, per_page } = useGetPaginationParams({
        defaultPage: meta?.current_page,
        defaultPerPage: meta?.per_page,
        pageParamKey: 'page',
        perPageParamKey: 'per_page',
    });
    const setPaginationParams = useSetPaginationParams();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pageIndex, setPageIndex] = useState(page - 1);
    const [pageSize, setPageSize] = useState(per_page);

    useEffect(() => {
        if (meta) {
            const newIndex = meta.current_page - 1;
            const newSize = meta.per_page;
            if (newIndex !== pageIndex) setPageIndex(newIndex);
            if (newSize !== pageSize) setPageSize(newSize);
        }
    }, [meta, pageIndex, pageSize]);

    useEffect(() => {
        if (Object.keys(rowSelection).length > 0) {
            setRowSelection({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex]);

    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        pageCount: meta?.last_page ?? 1,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            globalFilter,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: { pageIndex, pageSize },
        },
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === 'function'
                    ? updater({ pageIndex, pageSize })
                    : updater;

            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);

            setPaginationParams({
                page: newPagination.pageIndex + 1,
                per_page: newPagination.pageSize,
            });
        },
    });

    return {
        table,
        setGlobalFilter,
    };
}
