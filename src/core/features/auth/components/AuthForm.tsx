'use client';

import { TypographyH1 } from '@/core/components/custom/ui/Typography';
import { Button } from '@/core/components/shadcn/ui/button';
import { Card, CardContent } from '@/core/components/shadcn/ui/card';
import { Input } from '@/core/components/shadcn/ui/input';
import { Label } from '@/core/components/shadcn/ui/label';
import Link from 'next/link';

import { useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

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

export function PasswordField({ label }: { label?: string }) {
  const id = useId();
  const { watch, register } = useForm();

  const password = watch('password');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
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
            className="pe-9"
            placeholder="رمز عبور"
            type={isVisible ? 'text' : 'password'}
            aria-describedby={`${id}-description`}
            {...register('password', {
              onChange(e) {
                e.target.value = e.target.value.replace(regex, '');
              },
            })}
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
        aria-label="قدرت رمز عبور"
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
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon size={16} className="text-emerald-500" aria-hidden="true" />
            ) : (
              <XIcon size={16} className="text-muted-foreground/80" aria-hidden="true" />
            )}
            <span className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
              {req.text}
              <span className="sr-only">{req.met ? ' - الزامات رعایت شده' : ' - الزامات رعایت نشده'}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuthForm() {
  return (
    <>
      <Card className="w-full max-w-md mx-auto max-sm:min-h-screen">
        <CardContent className="px-3">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <Link href={'/'}>
                  <TypographyH1 className="text-3xl font-vazir-bold">Space Zone</TypographyH1>
                </Link>
                <p className="text-muted-foreground text-balance">وارد حساب کاربری خود شوید</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" type="email" placeholder="example@domain.com" required />
              </div>
              <div className="grid gap-3">
                <PasswordField label="رمز عبور" />
                <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline text-muted-foreground">
                  رمز عبور خود را فراموش کرده‌اید؟
                </a>
              </div>
              <Button type="submit" className="w-full text-xl font-vazir-bold">
                ورود
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AuthForm;
