import React from 'react';
import { AboutSectionFooter, ContactCompanyFooter, CopyRightFooter, HeroSectionFooter } from '../block/footer';
import { NavLinksFooter } from '../block/footer/NavLinksFooter';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-4">
      <HeroSectionFooter />
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-9 max-lg:max-w-3xl max-lg:text-center">
        <AboutSectionFooter />

        <NavLinksFooter
          title="سایر موارد"
          ariaLabel="لینک‌های مرتبط با اگرومیتو"
          links={[
            { href: '/partners/ferdowsi-university', label: 'دانشگاه فردوسی مشهد' },
            { href: '/partners/khorasan-science-park', label: 'پارک علم و فناوری خراسان رضوی' },
            { href: '/community/tak-network', label: 'شبکه اجتماعی کشاورزی ایران(تاک)' },
            { href: '/community/experts-network', label: 'شبکه جامع کارشناسان کشاورزی ایران' },
            { href: '/contact', label: 'ارتباط با ما' },
          ]}
        />

        <NavLinksFooter
          title="انجمن‌ها"
          ariaLabel="انجمن‌های کشاورزی مرتبط با اگرومیتو"
          links={[
            { href: 'https://soil.ir', label: 'انجمن علوم خاک ایران' },
            { href: 'https://ias.org.ir', label: 'انجمن علوم دام ایران' },
            { href: 'https://horticulture.ir', label: 'انجمن علوم باغبانی ایران' },
            { href: '/community/farmers-network', label: 'شبکه جامع کشاورزان پیشرو' },
          ]}
        />
        <ContactCompanyFooter />
      </div>
      <div className="border-t border-gray-300 my-5" />
      <CopyRightFooter />
    </footer>
  );
};

export default Footer;
