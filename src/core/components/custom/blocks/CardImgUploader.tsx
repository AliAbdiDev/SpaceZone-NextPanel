/* eslint-disable jsx-a11y/alt-text */
import { BasicImgUploader } from '@/core/components/custom/ui/BasicImgUploader';
import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { Card } from '@/core/components/shadcn/ui/card';
import { cn } from '@/core/utils';
import { Image } from 'lucide-react';

export const CardImgUploader = ({
  src,
  setSrc,
  alt,
  name,
  classNames,
}: {
  src: string;
  setSrc: (value: string) => string | void;
  alt: string;
  name: string;
  classNames?: string;
}) => {
  return (
    <Card className={cn('shadow w-full h-full min-h-[600px] pt-0 pb-1 overflow-hidden', classNames)}>
      <div className="relative w-full h-[calc(100%-8rem)]">
        {src ? (
          <ImgNormalCustom
            alt={alt}
            src={src || '/placeholder-image.jpg'}
            fill
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/60 to-sky-50 flex items-center justify-center">
            <Image size={120} className="text-purple-300" />
          </div>
        )}
      </div>
      <BasicImgUploader className="h-12 p-3 pt-0" name={name} onPreviewChange={setSrc} />
    </Card>
  );
};
