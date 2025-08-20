import type { ColumnDef, Table } from "@tanstack/react-table";

export interface TableProps<TData> {
    table: Table<TData>;
    columns: ColumnDef<TData>[];
}
export interface TableMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
};
