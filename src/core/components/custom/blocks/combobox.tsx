'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/ui/popover';
import { Button } from '../../shadcn/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../shadcn/ui/command';
import { cn } from '@/core/utils';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TypographyInputErrorMassage } from '../ui/Typography';
import { LabelCustom } from '../ui/LabelCustom';

interface Props {
  data: Record<'value' | 'label', string>[];
  comboboxName: string;
  buttonPlaceholder?: string;
  inputPlaceholder?: string;
  label?: string;
}
export function Combobox({ data, buttonPlaceholder, inputPlaceholder, comboboxName, label }: Props) {
  const [open, setOpen] = useState(false);
  const [comboValue, setComboValue] = useState('');
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const errorMassage = (errors?.[comboboxName]?.message as string) || null;

  const showValueHandler = () => {
    if (comboValue) {
      const dataFinded = data?.find((item) => item?.value === comboValue);
      setValue(comboboxName, dataFinded?.value);
      return dataFinded?.label;
    }
    return buttonPlaceholder || 'گزینه ایی را انتخاب کنید...';
  };

  return (
    <div>
      {label && <LabelCustom errorMessage={errorMassage}>{label}</LabelCustom>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" asChild>
          <Button
            variant="outline"
            type="button"
            role="combobox"
            aria-expanded={open}
            className="flex justify-between bg-input/5  border-input"
          >
            {showValueHandler()}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={inputPlaceholder || 'جستوجو گزینه ها...'} />
            <CommandList>
              <CommandEmpty>اطلاعاتی یافت نشد</CommandEmpty>
              <CommandGroup>
                {data?.map((item) => (
                  <CommandItem
                    key={item?.value}
                    value={item?.value}
                    onSelect={(currentValue) => {
                      setComboValue(currentValue === comboValue ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn('mr-2 h-4 w-4', comboValue === item?.value ? 'opacity-100' : 'opacity-0')}
                    />
                    {item?.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <TypographyInputErrorMassage>{errorMassage}</TypographyInputErrorMassage>
    </div>
  );
}
