'use client';

import { useEncodedScrollAnchor } from '@/core/hooks/custom/useEncodedScrollAnchor';
import { cn } from '@/core/utils';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { ElementType } from 'react';
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4 } from '@/core/components/custom/ui/Typography';

type TagType =
  | 'TypographyH1'
  | 'TypographyH2'
  | 'TypographyH3'
  | 'TypographyH4'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

const tagMap: Record<TagType, ElementType> = {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

type AnchorTitleProps = {
  title: string;
  ariaLabel: string;
  className?: string;
  tag?: TagType;
};

export function AnchorTitle({ title, ariaLabel, className, tag = 'h3' }: AnchorTitleProps) {
  const { id, trigger } = useEncodedScrollAnchor({ anchorValue: title });

  const Tag = tagMap[tag] || 'h3';

  return (
    <nav className="flex-1" aria-label={ariaLabel}>
      <Tag id={id} className={cn('mb-4 group inline-flex items-center gap-2 relative', className)}>
        <LinkIcon className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 hover:opacity-0 transition-opacity duration-200 absolute -right-3 transform translate-x-1/2" />
        <Link
          href={`#${id}`}
          onClick={trigger}
          className="hover:text-primary hover:underline duration-200 inline-block w-full"
        >
          {title}
        </Link>
      </Tag>
    </nav>
  );
}
