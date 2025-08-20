'use client';
import React, { useCallback, useEffect, useState } from 'react';
import FormNormal, { FormNormalProps } from './FormNormal';
import { useApiMutation } from '@/core/hooks/custom/useFetchReactQuery';
import { useRouter } from 'next/navigation';

interface FormSmartProps extends Omit<FormNormalProps, 'isLoading'> {
  submitEndPoint: string;
  successRedirectPath: string;
  submitMethod?: 'POST' | 'PUT';
  noRequest?: boolean;
}

function FormSmart({
  submitEndPoint,
  submitMethod = 'POST',
  children,
  onSubmit,
  noRequest,
  successRedirectPath,
  ...props
}: FormSmartProps) {
  const router = useRouter();

  const [values, setValues] = useState<any>(null);

  const { mutate, isPending, isSuccess } = useApiMutation({
    endpoint: submitEndPoint,
    method: submitMethod,
  });

  useEffect(() => {
    if (isSuccess && successRedirectPath) {
      router.push(successRedirectPath);
    }
  }, [isSuccess, successRedirectPath, router]);

  const handleSubmit = useCallback(
    (formData: any) => {
      const modifiedData = onSubmit ? onSubmit(formData) : formData;
      setValues(modifiedData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutate, noRequest]
  );

  useEffect(() => {
    if (noRequest) return;
    if (values) {
      mutate(values);
    }
  }, [values, mutate, noRequest]);

  return (
    <FormNormal isLoading={isPending} onSubmit={handleSubmit} {...props}>
      {children}
    </FormNormal>
  );
}

export default FormSmart;
