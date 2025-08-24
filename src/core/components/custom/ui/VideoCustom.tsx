import { cn, validateNonEmptyArray } from '@/core/utils';
import { HTMLAttributes, ReactNode } from 'react';

type VideoSource = {
  src: string;
  type?: string;
  sizeLabel?: string;
};

type VideoCustomProps = HTMLAttributes<HTMLVideoElement> & {
  src?: string;
  sources?: VideoSource[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  allowDownload?: boolean;
  tempVideoComponent?: ReactNode;
};

function VideoCustom({
  src,
  sources = [],
  poster,
  className: className,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  allowDownload = false,
  tempVideoComponent,
  ...rest
}: VideoCustomProps) {
  const noSrcProp = !src && !validateNonEmptyArray(sources);
  if (noSrcProp && tempVideoComponent) {
    return tempVideoComponent;
  }

  if (noSrcProp) {
    return null;
  }

  return (
    <>
      <video
        className={cn('size-full object-cover', className)}
        poster={poster}
        autoPlay={autoPlay}
        controls={controls}
        controlsList={allowDownload ? '' : 'nodownload'}
        loop={loop}
        muted={muted}
        {...rest}
      >
        {src && <source src={src} type="video/mp4" />}
        {validateNonEmptyArray(sources) &&
          sources?.map((source, index) => (
            <source
              key={index}
              src={source.src}
              type={source.type || 'video/mp4'}
              {...(source.sizeLabel && { 'data-size': source.sizeLabel })}
            />
          ))}
        مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
      </video>
      {allowDownload && (src || validateNonEmptyArray(sources)) && (
        <>
          {src && <a className="hidden" href={src} download />}
          {validateNonEmptyArray(sources) &&
            sources?.map((source, index) => (
              <a key={index} className="hidden" href={source.src} download>
                دانلود ویدیو ({source.sizeLabel || `رزولوشن ${index + 1}`})
              </a>
            ))}
        </>
      )}
    </>
  );
}

export { VideoCustom };
