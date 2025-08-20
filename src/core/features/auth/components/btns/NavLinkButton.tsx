import { Button } from '@/core/components/shadcn/ui/button';
import Link from 'next/link';

function NavLinkButton({ label, destination, isDisabled = false }) {
  return (
    <Link href={destination || ''} className={`block ${isDisabled && 'pointer-events-none'}`}>
      <Button variant="outline" className="w-full text-lg" type="button" disabled={isDisabled}>
        {label}
      </Button>
    </Link>
  );
}
export default NavLinkButton;
