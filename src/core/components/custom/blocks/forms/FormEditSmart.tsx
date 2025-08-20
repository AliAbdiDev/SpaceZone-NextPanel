'use client';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormNormal, { FormNormalProps } from './FormNormal';
import { useApiQuery, useApiMutation } from '@/core/hooks/custom/useFetchReactQuery';
import { DashboardSkeleton } from '@/core/features/dashboard/components/blocks';

interface EditFormProps extends Omit<FormNormalProps, 'isLoading' | 'defaultValues' | 'onSubmit'> {
  SuccessRedirectPath?: string;
  children: ReactNode;
  defaultValue: (value: any) => any;
  getPropsData: {
    queryId?: string;
    endpoint?: string;
    fullEndpoint?: string;
  };
  editPropsData: {
    queryId?: string;
    endpoint?: string;
    fullEndpoint?: string;
  };
  Skeleton?: React.ComponentType;
  disabledSkeleton?: boolean;
  handleSubmitData?: (data: any) => any;

  onFetched?: (data: any) => void;
}

export default function FormEditSmart({
  SuccessRedirectPath,
  children,
  editPropsData,
  getPropsData,
  defaultValue,
  handleSubmitData,
  Skeleton,
  disabledSkeleton = false,
  onFetched,
  ...props
}: EditFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryEndpoint =
    getPropsData?.fullEndpoint || `${getPropsData?.endpoint}/${searchParams.get(getPropsData?.queryId)}`;
  const mutationEndpoint =
    editPropsData?.fullEndpoint || `${editPropsData?.endpoint}/${searchParams.get(editPropsData?.queryId)}`;

  // get data
  const { isLoading, data } = useApiQuery({ endpoint: queryEndpoint });

  // expose fetched data via callback when it changes
  useEffect(() => {
    if (typeof onFetched === 'function') {
      try {
        onFetched(data);
      } catch {}
    }
  }, [data, onFetched]);

  // edit data
  const { mutate, isSuccess } = useApiMutation({
    endpoint: mutationEndpoint,
    method: 'PUT',
  });

  // success redirect
  useEffect(() => {
    if (isSuccess && SuccessRedirectPath) {
      router.push(SuccessRedirectPath);
    }
  }, [isSuccess, SuccessRedirectPath, router]);

  const handleSubmit = useCallback(
    (formData: any) => {
      const modifiedData = handleSubmitData ? handleSubmitData(formData) : formData;
      if (!modifiedData) return;
      mutate(modifiedData);
    },
    [mutate, handleSubmitData]
  );

  const memoizedDefaultValues = React.useMemo(() => {
    return defaultValue(data) ?? '';
  }, [data, defaultValue]);

  const FormSkeleton = Skeleton || DashboardSkeleton;
  if (isLoading && !disabledSkeleton) {
    return <FormSkeleton />;
  }

  return (
    <FormNormal defaultValues={memoizedDefaultValues} isLoading={isLoading} onSubmit={handleSubmit} {...props}>
      {children}
    </FormNormal>
  );
}
