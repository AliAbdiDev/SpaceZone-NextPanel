'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ComponentType, ReactNode } from 'react';
import { useApiMutation, useApiQuery } from './useFetchReactQuery';
import { DashboardSkeleton } from '@/core/features/dashboard/components/blocks';

interface UseEditFormProps<T> {
  endpoint?: string;
  redirectPath: string;
  loadingComponent?: ComponentType;
  getData: {
    queryId?: string;
    endpoint?: string;
    fullEndpoint?: string;
  };
  editData: {
    queryId?: string;
    endpoint?: string;
    fullEndpoint?: string;
  };
  children: (props: {
    data: T | null;
    mutate: (data: T) => void;
    isPending: boolean;
    error: Error | null;
    mutationError: Error | null;
  }) => ReactNode;
}

/**
 * A custom React hook for managing edit forms with data fetching, mutation, and loading state handling.
 * Renders a loading component during data fetching and delegates main content to a `children` render function.
 *
 * @template T - The type of the data fetched and mutated.
 * @param props - Configuration object for the hook.
 * @param props.redirectPath - Path to redirect after successful mutation (e.g., "/dashboard/admin/user-manage/list").
 * @param props.loadingComponent - Optional custom loading component (defaults to `Skeleton`).
 * @param props.getData - API config for fetching data.
 * @param props.getData.endpoint - API endpoint for fetching (e.g., "/user").
 * @param props.getData.queryId - Query parameter ID for fetching (e.g., "user_id").
 * @param props.editData - API config for mutating data.
 * @param props.editData.endpoint - API endpoint for mutation (e.g., "/user").
 * @param props.editData.queryId - Query parameter ID for mutation (e.g., "user_id").
 * @param props.children - Render function receiving hook state and returning main content.
 * @param props.children.props.data - Fetched data (type T) or null.
 * @param props.children.props.mutate - Function to trigger PUT mutation.
 * @param props.children.props.isPending - Indicates if mutation is in progress.
 * @param props.children.props.error - Data fetching error, if any.
 * @param props.children.props.mutationError - Mutation error, if any.
 * @returns A ReactNode: loading component during `isLoading` or result of `children` function.
 *
 * @example
 * ```tsx
 * 'use client';
 * import { UseEditForm } from '@/hooks/UseEditForm';
 * import { User } from '@/types/user';
 * import { FormNormal, CreateEditUserFields } from '@/components';
 * import { schema } from '@/schemas/user';
 *
 * export default function EditUserForm() {
 *   return (
 *     <UseEditForm<User>
 *       redirectPath="/dashboard/admin/user-manage/list"
 *       getData={{ endpoint: '/user', queryId: 'user_id' }}
 *       editData={{ endpoint: '/user', queryId: 'user_id' }}
 *     >
 *       {({ data, mutate, isPending, error, mutationError }) => (
 *         <>
 *           {error && <p className="text-red-500">{error.message}</p>}
 *           {mutationError && <p className="text-red-500">{mutationError.message}</p>}
 *           <FormNormal
 *             defaultValues={data?.data?.user}
 *             onSubmit={(formData) => {
 *               console.log(formData);
 *               mutate(formData);
 *             }}
 *             schema={schema()}
 *           >
 *             <CreateEditUserFields isEdit isPending={isPending} />
 *             <button type="submit" disabled={isPending}>
 *               {isPending ? 'Saving...' : 'Save'}
 *             </button>
 *           </FormNormal>
 *         </>
 *       )}
 *     </UseEditForm>
 *   );
 * }
 * ```
 */
export function UseEditForm<T>({
  redirectPath,
  loadingComponent: LoadingComponent,
  getData,
  editData,
  children,
}: UseEditFormProps<T>) {
  const query = useSearchParams();
  const router = useRouter();

  const queryEndpoint = getData?.fullEndpoint || `${getData?.endpoint}/${query.get(getData?.queryId)}`;
  const { data, isLoading, error } = useApiQuery<T>({
    endpoint: queryEndpoint,
  });

  const mutationEndpoint = editData?.fullEndpoint || `${editData?.endpoint}/${query.get(editData?.queryId)}`;
  const {
    mutate,
    isSuccess,
    isPending,
    error: mutationError,
  } = useApiMutation({
    endpoint: mutationEndpoint,
    method: 'PUT',
  });

  if (isSuccess) {
    router.push(redirectPath);
  }

  const DefaultLoadingComponent = () => <DashboardSkeleton />;
  const RenderLoading = LoadingComponent || DefaultLoadingComponent;

  if (isLoading) {
    return <RenderLoading />;
  }

  return children({
    data,
    mutate,
    isPending,
    error,
    mutationError,
  });
}
