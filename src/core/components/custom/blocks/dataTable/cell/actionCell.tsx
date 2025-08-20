import { CellContext } from '@tanstack/react-table';
import { ComponentType } from 'react';

export type ActionConfigCellProps<T> = CellContext<T, unknown>;
interface Props<T> {
  ActionComponent: ComponentType<ActionConfigCellProps<T>>;
}

export const actionCell = <T,>({ ActionComponent }: Props<T>) => {
  return {
    id: 'actions',
    meta: { disableFilter: true },
    cell: (props: ActionConfigCellProps<T>) => <ActionComponent {...props} />,
  };
};
