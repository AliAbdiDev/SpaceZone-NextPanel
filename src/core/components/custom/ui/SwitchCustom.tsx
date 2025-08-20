import { Label } from '@/core/components/shadcn/ui/label';
import React, { useId } from 'react';
import { Switch } from '../../shadcn/ui/switch';
import { Controller, useFormContext } from 'react-hook-form';
import { LabelCustom } from './LabelCustom';

export default function SwitchCustom({
  switchName,
  initalValue,
  label,
  ...props
}: { switchName: string; initalValue?: boolean; label: string } & React.ComponentProps<typeof Switch>) {
  const { control } = useFormContext();
  const id = useId();
  return (
    <div className="inline-flex flex-col items-srart gap-2">
      <LabelCustom htmlFor={id}>{label}</LabelCustom>
      <Controller
        name={switchName || ''}
        control={control}
        defaultValue={initalValue || false}
        render={({ field }) => {
          return (
            <Switch
              id={id}
              value={field?.value || false}
              onCheckedChange={(checked) => {
                field?.onChange(checked);
              }}
              className="data-[state=checked]:bg-sky-600  h-5 w-9 [&_span]:size-4 data-[state=checked]:[&_span]:translate-x-4 data-[state=checked]:[&_span]:rtl:-translate-x-4 cursor-pointer"
              {...props}
            />
          );
        }}
      />
      <Label className="sr-only">{label}</Label>
    </div>
  );
}
