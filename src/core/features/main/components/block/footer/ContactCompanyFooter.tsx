import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import SvgComponent from '@/core/components/custom/ui/SvgImg';
import { Phone } from 'lucide-react';
import Link from 'next/link';

export const ContactCompanyFooter = () => (
  <div className="">
    <div className="flex items-center justify-center gap-3">
      <ImgNormalCustom
        src="/main/enamad-logo.png"
        alt="لوگوی اینماد اگرومیتو برای خدمات کشاورزی"
        width={120}
        height={120}
        quality={80}
        loading="lazy"
      />
      <ImgNormalCustom
        src="/main/enamad.png"
        alt="نماد اعتماد الکترونیکی اگرومیتو"
        width={120}
        height={120}
        quality={80}
        loading="lazy"
      />
    </div>
    <div className="flex items-center justify-center gap-5 mt-5 !text-white" aria-label="شبکه‌های اجتماعی اگرومیتو">
      {[
        {
          href: 'https://instagram.com/agromito',
          ariaLabel: 'اینستاگرام اگرومیتو',
          icon: <SvgComponent src={'/common/icons/instagram.svg'} alt={'اینستاگرام اگرومیتو'} />,
        },
        {
          href: 'https://t.me/agromito',
          ariaLabel: 'تلگرام اگرومیتو',
          icon: <SvgComponent src={'/common/icons/telegram.svg'} alt={'تلگرام اگرومیتو'} />,
        },
        { href: 'tel:+989123456789', ariaLabel: 'شماره تماس اگرومیتو', icon: <Phone /> },
      ]?.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          aria-label={social.ariaLabel}
          className="size-9 bg-primary transition-all duration-200 hover:bg-primary-dark hover:shadow-lg ease-in-out rounded-lg flex items-center justify-center"
          rel="nofollow"
          {...(social?.href?.startsWith('http') ? { target: '_blank' } : {})}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  </div>
);
