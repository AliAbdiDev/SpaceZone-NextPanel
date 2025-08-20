import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { ManiTypographyLead } from '../../ui/MainTypography';
import { TypographyH1 } from '@/core/components/custom/ui/Typography';
import { ButtonLink } from '@/core/components/custom/ui/Buttons';

function HeroSection() {
  return (
    <section className="flex items-center justify-between max-lg:flex-col max-lg:bg-gradient-to-b from-blue-100/70 to-background size-full pt-[6.5rem] lg:pt-24">
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start max-w-[35rem] space-y-7 max-lg:text-center">
        <TypographyH1 className="text-primary"> شبکه اشتراک دانش کشاورزی</TypographyH1>
        <ManiTypographyLead>
          <span className="text-primary font-semibold">اگرومیتو</span> یک شبکه اشتراک دانش به صورت تخصصی در حوزه کشاورزی
          است که به منظور برگزاری جلسات و دوره‌های آموزشی آنلاین و حضوری طراحی شده است. این پلتفرم، فضایی را فراهم
          می‌کند تا مخاطبان حوزه کشاورزی بتوانند در دوره‌های آموزشی شرکت کرده و سطح دانش خود را ارتقاء دهند.
        </ManiTypographyLead>

        <div className="flex items-center justify-center lg:justify-start gap-3 w-full ">
          <ButtonLink className="w-full max-w-xs" href={'/shop'}>
            مشاهده دوره‌ها
          </ButtonLink>
          <ButtonLink variant="secondary" className=" max-w-xs w-full" href={'#'}>
            ماموریت اساسنامه
          </ButtonLink>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative hidden lg:block">
        <ImgNormalCustom
          priority
          unoptimized
          src={'/main/landing/hero-sesction.jpg'}
          alt="تصویر  جلسه اگرویار"
          width={300}
          height={200}
          className="size-full object-contain"
        />
      </div>
    </section>
  );
}

export default HeroSection;
