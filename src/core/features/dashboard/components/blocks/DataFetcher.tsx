import { DashboardSkeleton } from '@/core/features/dashboard/components/blocks';
import { useApiQuery } from '@/core/hooks/custom';
import type { ReactNode } from 'react';

type UseApiQueryProps = Parameters<typeof useApiQuery>[0];

type DataFetcherProps<T> = {
  useApiQueryProp: UseApiQueryProps;
  children: (data: T | undefined) => ReactNode;
};

function DataFetcher<T>({ useApiQueryProp, children }: DataFetcherProps<T>) {
  const { data, isLoading } = useApiQuery<T>(useApiQueryProp);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return <>{children(data)}</>;
}

export default DataFetcher;
