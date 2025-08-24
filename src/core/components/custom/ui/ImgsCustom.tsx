import Image, { ImageProps } from 'next/image';

type ImgsCustomProps = ImageProps & {
  src?: string;
  alt?: string;
  className?: string;
};

function ImgNormalCustom({
  src = '/placeholder-image.jpg',
  alt = 'تصویر پیش‌فرض',
  className: className,
  ...rest
}: ImgsCustomProps) {
  if (!src) {
    return null;
  }

  const placeholderValue = rest.blurDataURL || typeof src !== 'string' ? 'blur' : 'empty';

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      priority={rest.priority || false}
      placeholder={placeholderValue}
      {...rest}
    />
  );
}

export { ImgNormalCustom };
