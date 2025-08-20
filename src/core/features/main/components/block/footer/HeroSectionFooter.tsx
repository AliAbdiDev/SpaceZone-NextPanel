import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';

export const HeroSectionFooter = () => (
  <section className="w-full text-start relative h-48 md:h-64 lg:h-80 container mx-auto" aria-label="اگرومیتو فوتر هدر">
    <p className="font-iranBold text-3xl md:text-4xl lg:text-5xl relative z-10 h-full flex items-center px-[3%]">
      اگرومیتو، دانش امروز برای کشاورزی فردا
    </p>
    <div className="size-full absolute inset-0">
      <ImgNormalCustom
        src="/main/footer-img.png"
        alt="تصویر پس‌زمینه اگرومیتو برای آموزش کشاورزی نوین"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
        className="object-contain lg:object-cover"
        quality={85}
        priority={false}
      />
    </div>
  </section>
);
