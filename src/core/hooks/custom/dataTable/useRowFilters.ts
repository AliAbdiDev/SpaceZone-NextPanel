'use client';

import { useCallback, useEffect, useState } from 'react';
import { validateNonEmptyArray } from '@/core/utils';
import { UseTableFiltersProps, UseTableFiltersReturn } from '@/core/assets/types';

const statusTranslations: Record<string, string> = {
    فعال: 'active',
    غیرفعال: 'inactive',
    'درحالانتظار': 'pending',
};

/**
 * Manages filtering state (global or column-specific) based on table's defined columns.
 * Ensures only one filter mode (global or column-specific) is active at a time.
 * Uses meta.title for column titles and supports enabling/disabling filter modes.
 * Supports Persian status search for the 'status' column by mapping Persian terms to English equivalents,
 * normalizing input by removing spaces for matching.
 *
 * @template TData - Row data type
 * @param table - The TanStack table instance
 * @param setGlobalFilter - Sets the table's global filter string
 * @param disableGlobalFilter - Disables global filter mode
 * @param disableColumnFilter - Disables column-specific filter mode
 * @param open - Tracks whether the filter dropdown is open
 * @returns Filtering state and handlers for use in filter UIs
 */
export function useTableFilters<TData>({
    table,
    setGlobalFilter,
    disableGlobalFilter = false,
    disableColumnFilter = false,
    open,
}: UseTableFiltersProps<TData> & { open: boolean }): UseTableFiltersReturn {
    const availableFilterColumns = table
        .getAllColumns()
        .filter(
            (col) =>
                typeof col.accessorFn !== 'undefined' &&
                !col.columnDef.meta?.disableFilter &&
                col.id !== 'select' &&
                col.id !== 'actions'
        )
        .map((col) => col.id);

    const defaultFilterMode = !disableGlobalFilter
        ? 'global'
        : !disableColumnFilter
            ? 'column'
            : 'auto';

    const [filterMode, setFilterMode] = useState<'global' | 'column' | 'auto'>(
        defaultFilterMode
    );

    const initialSelectedFilter =
        filterMode === 'column' && availableFilterColumns.length > 0
            ? [...availableFilterColumns]
            : [];

    const [selectedFilter, setSelectedFilter] = useState<string[]>(initialSelectedFilter);

    const headerTitle =
        filterMode === 'global' ||
            (filterMode === 'auto' && !validateNonEmptyArray(selectedFilter))
            ? 'فیلتر سراسری'
            : table
                .getAllColumns()
                .filter((c) => selectedFilter.includes(c.id))
                .map((c) => c.columnDef.meta?.title ?? c.id)
                .join('، ') || 'فیلتر ستونی';

    const clearAllColumnFilters = useCallback(() => {
        availableFilterColumns.forEach((colId) => {
            table.getColumn(colId)?.setFilterValue('');
        });
    }, [availableFilterColumns, table]);

    const handleFilterChange = useCallback(
        (value: string) => {
            const isColumnFilter =
                filterMode === 'column' ||
                (filterMode === 'auto' && validateNonEmptyArray(selectedFilter));

            let filterValue = value;
            if (selectedFilter.includes('status') || !isColumnFilter) {
                const normalizedInput = value.trim().replace(/\s/g, '');
                filterValue = statusTranslations[normalizedInput] || value.trim();
            }

            if (!isColumnFilter) {
                if (!disableGlobalFilter) {
                    setGlobalFilter(filterValue);
                    clearAllColumnFilters();
                }
            } else {
                if (!disableColumnFilter) {
                    setGlobalFilter('');
                    selectedFilter.forEach((colId) => {
                        const column = table.getColumn(colId);
                        if (column) {
                            const finalValue = colId === 'status' ? filterValue : value.trim();
                            column.setFilterValue(finalValue);
                        }
                    });
                    availableFilterColumns
                        .filter((id) => !selectedFilter.includes(id))
                        .forEach((colId) => {
                            table.getColumn(colId)?.setFilterValue('');
                        });
                }
            }
        },
        [
            filterMode,
            selectedFilter,
            disableGlobalFilter,
            setGlobalFilter,
            clearAllColumnFilters,
            disableColumnFilter,
            availableFilterColumns,
            table,
        ]
    );

    const handleClearFilter = useCallback(() => {
        setGlobalFilter('');
        clearAllColumnFilters();
        setSelectedFilter([]);
    }, [clearAllColumnFilters, setGlobalFilter]);

    const toggleAllNone = useCallback(
        (currentValue: string, checked: boolean, toggledCol: string) => {
            if (filterMode === 'global' || disableColumnFilter) {
                return;
            }
            setSelectedFilter((prev) =>
                checked
                    ? Array.from(new Set([...prev, toggledCol]))
                    : prev.filter((id) => id !== toggledCol)
            );
            handleFilterChange(currentValue);
        },
        [handleFilterChange, filterMode, disableColumnFilter]
    );

    const setFilterModeHandler = useCallback(
        (mode: 'global' | 'column' | 'auto') => {
            if (mode === 'global' && disableGlobalFilter) return;
            if (mode === 'column' && disableColumnFilter) return;
            setFilterMode(mode);
            if (mode === 'global') {
                setSelectedFilter([]);
                clearAllColumnFilters();
            } else if (mode === 'column') {
                setSelectedFilter([...availableFilterColumns]);
                setGlobalFilter('');
            }
        },
        [availableFilterColumns, clearAllColumnFilters, setGlobalFilter, disableGlobalFilter, disableColumnFilter]
    );

    useEffect(() => {
        if (!open && filterMode === 'column' && !validateNonEmptyArray(selectedFilter)) {
            setFilterModeHandler('global');
            handleFilterChange('');
        }
    }, [open, filterMode, selectedFilter, availableFilterColumns, handleFilterChange, setFilterModeHandler]);

    return {
        selectedFilter,
        availableFilterColumns,
        headerTitle,
        handleFilterChange,
        handleClearFilter,
        toggleAllNone,
        filterMode,
        setFilterMode: setFilterModeHandler,
    };
}