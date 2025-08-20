// src/types/react-table.d.ts
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        title?: string;
        disableFilter?: boolean;
        disableExport?: boolean
    }
}
