import { ButtonLink } from '@/core/components/custom/ui/Buttons';
import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { ManiTypographyLead } from '../../ui/MainTypography';
import { TypographyH2 } from '@/core/components/custom/ui/Typography';

function TeachingSection() {
  return (
    <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative z-0">
      <div className="lg:w-1/2 h-full overflow-hidden rounded-lg text-start max-lg:shadow-lg">
        <span className=" block bg-accent space-y-6 py-12 lg:py-28 max-lg:pl-4  pr-6">
          <TypographyH2 className="text-primary text-start">تدریس در اگرومیتو</TypographyH2>

          <ManiTypographyLead>
            اعضاء هیئت علمی، متخصصین و افراد باتجربه در حوزه کشاورزی میتوانند به عنوان مدرس در اگرومیتو فعالیت داشته
            باشند. برای ثبت نام به عنوان مدرس کلیک نمایید.
          </ManiTypographyLead>
          <ButtonLink href={'/sign-up'} className="w-36 ">
            ثبت نام مدرس
          </ButtonLink>
        </span>
      </div>

      <span className="hidden lg:block w-1/2 p-3 rounded-lg shadow-lg">
        <ImgNormalCustom
          src={'/main/landing/teaching-img.png'}
          alt="تصویر تدریس"
          className="size-full rounded-lg"
          width={200}
          height={200}
          unoptimized
        />
      </span>
    </div>
  );
}

export default TeachingSection;
