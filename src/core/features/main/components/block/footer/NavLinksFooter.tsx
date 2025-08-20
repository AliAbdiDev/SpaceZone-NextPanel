import Link from 'next/link';
import { AnchorTitle } from '@/core/components/custom/blocks/AnchorTitle';

export const NavLinksFooter = ({
  title,
  links,
  ariaLabel,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
  ariaLabel: string;
}) => {
  return (
    <nav aria-label={ariaLabel}>
      <AnchorTitle
        title={title ?? ''}
        ariaLabel={'لیست لینک های اگرومیتو'}
        tag={'TypographyH3'}
        className="text-lg font-semibold mb-4 text-gray-800"
      />
      <ul className="space-y-2">
        {links?.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="duration-200 text-foreground text-sm hover:text-primary hover:underline"
              {...(link.external ? { rel: 'nofollow', target: '_blank' } : {})}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
