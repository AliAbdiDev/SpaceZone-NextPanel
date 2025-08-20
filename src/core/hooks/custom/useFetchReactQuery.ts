'use client';

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions, QueryFilters } from '@tanstack/react-query';
import { toast } from 'sonner';
import { fetchHandler } from '@/core/services/api/fetch-handler';
import type { FetchProps } from '@/core/assets/types';
import { useAuthStore } from '@/core/services/state/auth';

/**
 * Hook for GET requests with auto caching via React Query.
 * @param fetchProps - Fetch properties excluding method, with optional useToken and queryParams
 * @param queryOptions - Optional React Query configuration
 * @returns Query result with data or error
 */
export function useApiQuery<TData>(
  fetchProps: Omit<FetchProps, 'method'> & { useToken?: boolean, retry?: number },
  queryOptions?: UseQueryOptions<TData, Error, TData, ['api', string, any, any, string]>
) {
  const { endpoint, payload, queryParams, options, customErrorMessage, useToken = true, retry } = fetchProps;
  const { token: storedToken } = useAuthStore((s) => s);
  const token = useToken ? storedToken || '' : undefined;

  return useQuery<TData, Error>({
    queryKey: ['api', endpoint, queryParams, payload,],
    queryFn: () =>
      fetchHandler({
        endpoint,
        method: 'GET',
        payload,
        queryParams,
        token,
        options,
        customErrorMessage,
        typeRequest: 'json',
      }),
    staleTime: 1000 * 60 * 10,
    retry: retry ?? 0,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    ...queryOptions,
  });
}

/**
 * Hook for mutations (POST, PUT, PATCH, DELETE) with auto cache management.
 * @param fetchProps - Fetch properties excluding payload, with optional method, useToken, and queryParams
 * @param mutationOptions - Optional React Query mutation configuration
 * @returns Mutation result with data or error
 */
export function useApiMutation<TData, TVariables>(
  fetchProps: Omit<FetchProps, 'payload'> & {
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    useToken?: boolean;
    retry?: number
    toaster?: {
      toasterDisabled?: boolean,
    },

  },
  mutationOptions?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>,
) {
  const { endpoint, options, customErrorMessage, useToken = true, method = 'POST', queryParams, retry, toaster } = fetchProps;


  const { token: storedToken } = useAuthStore((s) => s);
  const token = useToken ? storedToken || '' : undefined;
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: (payload: TVariables) =>
      fetchHandler({
        endpoint,
        method,
        payload,
        queryParams,
        token,
        options,
        customErrorMessage,
        typeRequest: 'json',
      }),

    retry: retry ?? 0,
    onMutate: async (variables) => {
      const filters: QueryFilters = { queryKey: ['api', endpoint, queryParams,] };
      await queryClient.cancelQueries(filters);
      const previousData = queryClient.getQueryData<TData>(filters.queryKey);

      if (
        previousData &&
        Array.isArray((previousData as any)?.data) &&
        (variables as any).id
      ) {
        queryClient.setQueryData<TData>(filters?.queryKey, (old) => ({
          ...old,
          data: (old as any)?.data?.map((item: any) =>
            item.id === (variables as any)?.id ? { ...item, ...(variables as any) } : item
          ),
        }));
      }

      return { previousData };
    },

    onError: (error, variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData<TData>(['api', endpoint, queryParams,], context.previousData);
      }
      mutationOptions?.onError?.(error, variables, context);

      if (toaster?.toasterDisabled) return;

      if (error?.message?.includes('500')) {
        toast?.error('مشکلی پیش آمده لطفا کمی بعد دوباره تلاش کنید')
        return
      }

      toast.error(customErrorMessage || error?.message || 'عملیات انجام نشد');
    },

    onSuccess: (data, variables, context) => {
      if (!toaster?.toasterDisabled) {
        toast.success('عملیات با موفقیت انجام شد');
      }
      const filters: QueryFilters = { queryKey: ['api', endpoint, queryParams,] };
      queryClient.invalidateQueries(filters);
      mutationOptions?.onSuccess?.(data, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      const filters: QueryFilters = { queryKey: ['api', endpoint, queryParams,] };
      queryClient.invalidateQueries(filters);
      mutationOptions?.onSettled?.(data, error, variables, context);
    },

    ...mutationOptions,
  });
}