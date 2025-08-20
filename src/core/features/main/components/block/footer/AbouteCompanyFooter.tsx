import { TypographyH3, TypographyLead } from '@/core/components/custom/ui/Typography';

export const AboutSectionFooter = () => {
  return (
    <div>
      <TypographyH3
        className="text-lg font-semibold mb-4 text-gray-800"
        aria-label="اطلاعات درباره شرکت اگرومیتو"
        id="about-us"
      >
        درباره اگرومیتو
      </TypographyH3>
      <TypographyLead className="text-sm ">
        اگرومیتو با برگزاری دوره‌های تخصصی آنلاین برای یادگیری مهارت‌های کاربردی در حوزه خدمات کشاورزی همراه شماست.
        آموزش‌های اگرومیتو، زمینه‌ساز رشد آینده شما در کشاورزی نوین خواهد بود.
      </TypographyLead>
    </div>
  );
};
