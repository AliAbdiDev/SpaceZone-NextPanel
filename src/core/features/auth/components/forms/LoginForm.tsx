'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Seperator from '../Seperator';
import NavLinkButton from '../btns/NavLinkButton';
import InputPrimary from '../inputs/InputPrimary';
import Label from '../Label';
import PasswordField from '../inputs/PasswordField';
import ButtonAuth from '../ButtonAuth';
import { loginAction } from '@/app/actions/auth';

interface LoginFormProps {
  registerHref?: string;
}

interface FormData {
  mobile: string;
  password: string;
}

function LoginForm({ registerHref }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    // resolver: zodResolver(loginShema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await loginAction(data);

      if (result.error) {
        toast.error(result?.error?.message || 'نام کاربری یا رمز عبور اشتباه است');
        return;
      }

      toast.success('با موفقیت وارد شدید');
      router.push('/dashboard/admin');
      reset();
    } catch {
      toast.error('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <form className="w-full max-w-96 space-y-6 mx-auto pt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 text-right">
        <div className="space-y-1.5">
          <Label htmlFor="phone-number" className="pr-1 pb-1 inline-block">
            شماره موبایل
          </Label>
          <InputPrimary id="phone-number" type="tel" {...register('mobile')} errorMessage={errors.mobile?.message} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="pr-1 pb-1 inline-block">
            رمزعبور
          </Label>
          <PasswordField
            placeholder=""
            {...register('password')}
            errorMessage={errors.password?.message}
            className="w-full"
            id="password"
          />
        </div>
      </div>

      <div className="text-base px-1 text-primary flex max-sm:flex-col max-sm:gap-y-3 items-center justify-between max-md:text-sm  pt-3">
        <p>رمز عبور خود را فراموش کرده‌اید؟</p>
        <Link href="#" className="underline">
          بازیابی رمز عبور
        </Link>
      </div>

      <ButtonAuth label="ورود" isLoading={isSubmitting} className="py-6" />

      {registerHref && (
        <div className="space-y-5">
          <Seperator label="یا" />
          <NavLinkButton label="ثبت نام" destination={registerHref} isDisabled={isSubmitting} />
        </div>
      )}
    </form>
  );
}

export default LoginForm;
