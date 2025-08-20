import { Checkbox } from '@/core/components/shadcn/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

export function selectRowCol() {
  return {
    accessorKey: 'select',
    header: ({ table }) => (
      <Checkbox
        className="border border-input shadow-primary"
        checked={
          table.getIsAllPageRowsSelected() || ((table.getIsSomePageRowsSelected() && 'indeterminate') as CheckedState)
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border border-input shadow-primary"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { disableFilter: true },
  };
}
