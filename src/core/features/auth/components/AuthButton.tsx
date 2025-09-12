import { Button } from '@/core/components/shadcn/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

function AuthButton({ label }: { label: ReactNode }) {
  return (
    <Button type="submit" className="w-full text-xl font-vazir-bold">
      <Link href={'auth/otp'} className="size-full block min-h-7" tabIndex={-1}>
        {label}
      </Link>
    </Button>
  );
}

export default AuthButton;
