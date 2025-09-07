import React, { Ref, useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { cn } from '@/core/utils';
import { Input } from '@/core/components/shadcn/ui/input';
import { Label } from '@/core/components/shadcn/ui/label';

const getStrengthColor = (score: number) => {
  if (score === 0) return 'bg-border';
  if (score <= 1) return 'bg-red-500';
  if (score <= 2) return 'bg-orange-500';
  if (score === 3) return 'bg-amber-500';
  return 'bg-emerald-500';
};

const getStrengthText = (score: number): { isWeak: boolean; content: string } => {
  const result = {
    isWeak: true,
    content: '',
  };

  if (score === 0) {
    result.content = 'رمز عبور را وارد کنید';
  } else if (score <= 2) {
    result.content = 'رمز عبور ضعیف است';
  } else if (score === 3) {
    result.content = 'رمز عبور متوسط است';
  } else {
    result.content = 'رمز عبور قوی است';
    result.isWeak = false;
  }

  return result;
};

const checkStrength = (pass: string) => {
  const requirements = [
    { regex: /.{8,}/, text: 'حداقل ۸ کاراکتر' },
    { regex: /[0-9]/, text: 'حداقل ۱ عدد' },
    { regex: /[a-z]/, text: 'حداقل ۱ حرف کوچک' },
    { regex: /[A-Z]/, text: 'حداقل ۱ حرف بزرگ' },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }));
};

const regex = /\s/g;

type PropOutsideTypes = 'className' | 'value' | 'onChange' | 'ref' | 'type' | 'name';

export interface PasswordFieldProps extends Omit<React.ComponentProps<typeof Input>, PropOutsideTypes> {
  label?: string;
  ref?: Ref<HTMLInputElement>;
  className?: string;
}
export function PasswordField({ ref, label, className, ...props }: PasswordFieldProps) {
  const id = useId();

  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength?.filter((req) => req.met)?.length;
  }, [strength]);

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className="*:not-first:mt-2">
        {label && (
          <Label htmlFor={id} className="pb-1 inline-block">
            {label || ''}
          </Label>
        )}
        <div className="relative">
          <Input
            id={id}
            className={cn('pe-9', className)}
            placeholder="رمز عبور"
            type={isVisible ? 'text' : 'password'}
            aria-describedby={`${id}-description`}
            value={password}
            onChange={(e) => {
              const filteredValue = e.target.value.replace(regex, '');
              setPassword(filteredValue);
            }}
            ref={ref}
            {...props}
          />
          <button
            className="cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Password strength indicator */}
      <div
        className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="میزان قدرت رمز عبور"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        />
      </div>

      {/* Password strength description */}
      <p id={`${id}-description`} className="text-foreground mb-2 text-sm font-medium">
        {getStrengthText(strengthScore)?.content}، باید شامل موارد زیر باشد:
      </p>

      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="الزامات رمز عبور">
        {strength?.map((req, index) => (
          <li key={index} className="flex items-center gap-2 ">
            {req.met ? (
              <CheckIcon size={16} className="text-emerald-700" aria-hidden="true" />
            ) : (
              <XIcon size={16} className="text-destructive/95" aria-hidden="true" />
            )}
            <span className={`text-xs ${req.met ? 'text-emerald-700' : 'text-destructive/90'}`}>
              {req.text}
              <span className="sr-only">{req.met ? ' - الزامات رعایت شده' : ' - الزامات رعایت نشده'}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
