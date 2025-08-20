import { TypographyLead } from '@/core/components/custom/ui/Typography';
import { ReactNode } from 'react';

export function ManiTypographyLead({ children }: { children: ReactNode }) {
  return <TypographyLead className="leading-9 text-foreground text-md">{children}</TypographyLead>;
}
