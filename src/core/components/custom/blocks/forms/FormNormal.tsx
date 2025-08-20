'use client';
import { cn } from '@/core/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReactNode, useEffect } from 'react';
import { ButtonSubmit } from '../../ui/Buttons';
import { Card } from '@/core/components/shadcn/ui/card';

export interface FormNormalProps {
  schema?: z.ZodTypeAny;
  defaultValues?: any;
  onSubmit: (data: any) => void;
  children: ReactNode;
  className?: string;
  activeButton?: boolean;
  disabledParentCard?: boolean;
  isLoading?: boolean;
  classNameButtonSubmit?: string;
}

export function FormNormal({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  activeButton = true,
  isLoading = false,
  disabledParentCard = false,
  classNameButtonSubmit,
}: FormNormalProps) {
  const methods = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  if (!disabledParentCard) {
    return (
      <Card className="px-4 bg-accent/40">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={cn('max-w-5xl w-full flex flex-col mx-auto', className)}
          >
            {children}
            {activeButton && <ButtonSubmit isLoading={isLoading} className="mt-7 max-w-[10rem]" />}
          </form>
        </FormProvider>
      </Card>
    );
  } else {
    return (
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('max-w-5xl w-full flex flex-col mx-auto', className)}
        >
          {children}
          {activeButton && (
            <ButtonSubmit isLoading={isLoading} className={cn('mt-7 max-w-[10rem]', classNameButtonSubmit)} />
          )}
        </form>
      </FormProvider>
    );
  }
}

export default FormNormal;
