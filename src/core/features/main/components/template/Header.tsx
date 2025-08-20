'use client';

import DialogInput from '@/core/components/custom/blocks/DialogInput';
import LeftSideHeader from '../block/LeftSideHeader';
import { useState } from 'react';
import { MobileMenu } from '../block/header/MobileMenu';
import { DesktopMenu } from '../block/header/DesktopMenu';
import { Logo } from '../ui/Logo';
import { naviagtionHeader } from '@/core/features/main/assets/types/header';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [openSearchField, setOpenSearchField] = useState(false);
  const currentPath = usePathname();

  const checkActiveLink = (href: string) => currentPath?.startsWith(href);

  const BASE_LINKS: naviagtionHeader[] = [
    { href: '#about-us', label: 'درباره ما' },
    { href: '/shop', label: 'دوره ها', active: checkActiveLink('/shop') },
    { href: '/', label: 'خانه', active: currentPath === '/' },
  ];
  const desktopNavigationLinks = [...BASE_LINKS];

  const mobileNavigationLinks = [
    ...BASE_LINKS,
    {
      label: ' جستوجوی دوره',
      propertys: {
        onClick() {
          setOpenSearchField(true);
        },
      },
    },
  ];
  return (
    <header className="border-b px-4 md:px-6 fixed top-0 inset-x-0 bg-background z-50">
      <div className="flex items-center justify-between h-16 gap-7">
        {/* right side */}
        <div className="flex gap-5 items-center ">
          <MobileMenu navigationLinks={mobileNavigationLinks} />

          <Logo />

          <DesktopMenu navigationLinks={desktopNavigationLinks} />
        </div>

        <DialogInput isOpen={openSearchField} openHandler={setOpenSearchField} classNameTrigger="max-md:hidden" />

        {/* left side */}
        <div className="flex items-center justify-between gap-7">
          <LeftSideHeader />
        </div>
      </div>
    </header>
  );
}
