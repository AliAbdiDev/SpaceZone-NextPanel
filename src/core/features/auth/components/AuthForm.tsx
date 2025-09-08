'use client';

import { PasswordField } from '@/core/components/custom/ui/inputs/PasswordField';
import { Card, CardContent } from '@/core/components/shadcn/ui/card';
import { Input } from '@/core/components/shadcn/ui/input';
import { Label } from '@/core/components/shadcn/ui/label';
import AuthHeader from './AuthHeader';
import AuthButton from './AuthButton';

function AuthForm() {
  return (
    <>
      <Card className="w-full">
        <CardContent className="px-3">
          <form className="px-4">
            <div className="flex flex-col gap-6">
              <AuthHeader title="Space Zone" description="وارد حساب کاربری خود شوید" />
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
              <AuthButton label="ورود" />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AuthForm;
