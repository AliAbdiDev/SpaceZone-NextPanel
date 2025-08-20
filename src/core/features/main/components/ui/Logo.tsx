import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import Link from 'next/link';

export function Logo() {
  return (
    <Link className="relative size-10 block" href={'/'}>
      <ImgNormalCustom alt="logo" src={'/common/agrometo-logo.jpg'} className="object-cover" fill unoptimized />
    </Link>
  );
}
