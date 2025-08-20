'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/core/components/shadcn/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';
import { useDashboardLayout } from '../../services/providers';
import React from 'react';
import Link from 'next/link';
import { validateNonEmptyArray } from '@/core/utils';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/core/hooks/shadcn/use-mobile';
import { useNavData } from '../../hooks/useNavData';

interface Props {
  link: {
    activ?: boolean;
    path: string;
  };
  title: string;
  isLast?: boolean;
}
function BreadCrumbCustomItem({ link: { activ = false, path }, title, isLast = false }: Props) {
  if (!title) return null;

  return (
    <>
      <BreadcrumbItem>
        {activ && path ? (
          <BreadcrumbLink asChild>
            <Link href={path}>{title}</Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage>{title}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
      {!isLast && (
        <BreadcrumbSeparator className="max-sm:hidden block">
          <ChevronLeft className="mt-1 mr-1 " />
        </BreadcrumbSeparator>
      )}
    </>
  );
}
export function BreadcrumbCustom() {
  const currentPath = usePathname();
  let isLast: boolean = null;
  let activ: boolean = null;
  let itemPath: string = null;

  const isMobile = useIsMobile();
  const { sidebarConfig: sidbarConfig } = useDashboardLayout();

  const navData = useNavData(sidbarConfig['navMain']);

  const navigatData = navData?.navPath;
  if (!validateNonEmptyArray(navigatData)) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navigatData.map((item, index) => {
          isLast = index === navigatData.length - 1;
          activ = item?.secondaryUrl
            ? item?.url !== currentPath && item.secondaryUrl !== currentPath
            : item?.url !== currentPath;
          itemPath = item?.secondaryUrl || item?.url;

          if (isMobile && !isLast) return null;

          return (
            <BreadCrumbCustomItem
              key={`${item.url}-${index}`}
              link={{ activ, path: itemPath }}
              title={item.title}
              isLast={isLast}
            />
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
