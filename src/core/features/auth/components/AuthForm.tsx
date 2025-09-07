'use client';

import { PasswordField } from '@/core/components/custom/ui/inputs/PasswordField';
import { TypographyH1 } from '@/core/components/custom/ui/Typography';
import { Button } from '@/core/components/shadcn/ui/button';
import { Card, CardContent } from '@/core/components/shadcn/ui/card';
import { Input } from '@/core/components/shadcn/ui/input';
import { Label } from '@/core/components/shadcn/ui/label';
import Link from 'next/link';

function AuthForm() {
  return (
    <>
      <Card className="w-full">
        <CardContent className="px-3">
          <form className="p-4 ">
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
