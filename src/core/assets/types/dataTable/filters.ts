import { Table } from '@tanstack/react-table';

export interface UseTableFiltersProps<TData> {
    table: Table<TData>;
    setGlobalFilter: (value: string) => void;
    disableGlobalFilter?: boolean;
    disableColumnFilter?: boolean;
}

export interface UseTableFiltersReturn {
    selectedFilter: string[];
    availableFilterColumns: string[];
    headerTitle: string;
    handleFilterChange: (value: string) => void;
    handleClearFilter: () => void;
    toggleAllNone: (currentValue: string, checked?: boolean, toggledCol?: string) => void;
    filterMode: 'global' | 'column' | 'auto';
    setFilterMode: (mode: 'global' | 'column' | 'auto') => void;
}