import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn, validateNonEmptyArray } from '@/core/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../shadcn/ui/select';
import { LabelCustom } from './LabelCustom';
import { TypographyInputErrorMassage } from './Typography';

interface SelectBoxCustomProps {
  data: Record<'value' | 'label', string>[];
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
}

/**
 * Reusable SelectBox component integrated with React Hook Form and ShadCN
 * @param data - Array of objects with value and label for select options
 * @param name - Form field name for React Hook Form
 * @param placeholder - Placeholder text for the select box
 * @param className - Additional Tailwind classes
 * @param disabled - Disable the select box
 */
export const SelectBoxCustom: React.FC<SelectBoxCustomProps> = ({
  data,
  name,
  placeholder = '...گزینه ایی را انتخاب کنید',
  className,
  disabled = false,
  label,
}) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleValueChange = (value: string) => {
    const inputVal = value !== 'empty' ? value : null;
    setValue(name, inputVal, { shouldValidate: true });
  };

  const errorMassage = (errors?.[name]?.message as string) || null;

  return (
    <div>
      {label && <LabelCustom errorMessage={errorMassage}>{label}</LabelCustom>}
      <Select value={getValues(name) || ''} onValueChange={handleValueChange} disabled={disabled} {...register}>
        <SelectTrigger className={cn('w-full', className, disabled && 'opacity-50')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {validateNonEmptyArray(data) ? (
              data?.map((item, index) => (
                <SelectItem className="text-start" key={index} value={item?.value || 'empty'}>
                  {item?.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="emtpy">
                اطلاعاتی موجود نیست
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <TypographyInputErrorMassage>{errorMassage}</TypographyInputErrorMassage>
    </div>
  );
};
