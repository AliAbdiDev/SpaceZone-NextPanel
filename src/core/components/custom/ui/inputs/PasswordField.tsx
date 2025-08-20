'use client';

import { useId, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '@/core/components/shadcn/ui/input';
import { LabelCustom } from '../LabelCustom';
import { TypographyInputErrorMassage } from '../Typography';
import { useFormContext } from 'react-hook-form';

export function PasswordField({
  label,
  name,
  ...props
}: { label?: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors?.[name]?.message as string) || null;
  return (
    <div className="">
      {label && (
        <LabelCustom htmlFor={id} errorMessage={errorMessage}>
          {label}
        </LabelCustom>
      )}
      <div className="relative">
        <button
          className="cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? <EyeOffIcon size={18} aria-hidden="true" /> : <EyeIcon size={18} aria-hidden="true" />}
        </button>
        <Input
          {...register(name)}
          id={id}
          className="pe-9"
          placeholder="رمز عبور"
          type={isVisible ? 'text' : 'password'}
          {...props}
        />
      </div>

      <TypographyInputErrorMassage>{errorMessage}</TypographyInputErrorMassage>
    </div>
  );
}
