import { TypographyH1 } from '@/core/components/custom/ui/Typography';
import Link from 'next/link';

function AuthHeader({
  title,
  description,
  titleLinkHref,
}: {
  title: string;
  description?: string;
  titleLinkHref?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <Link href={titleLinkHref || '/'} tabIndex={-1}>
        <TypographyH1 className="text-3xl font-vazir-bold">{title || ''}</TypographyH1>
      </Link>
      <p className="text-muted-foreground text-balance">{description || ''}</p>
    </div>
  );
}

export default AuthHeader;
