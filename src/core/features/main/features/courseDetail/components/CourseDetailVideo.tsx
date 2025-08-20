import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { VideoCustom } from '@/core/components/custom/ui/VideoCustom';
export default function CourseDetailVideo({ posterSrc, videoSrc = null }: { posterSrc: string; videoSrc?: string }) {
  const renderedComponent = videoSrc ? (
    <VideoCustom src={videoSrc} />
  ) : (
    <ImgNormalCustom
      priority
      unoptimized
      width={500}
      height={500}
      src={posterSrc || '/poster-detail-video.jpg'}
      className="object-cover w-full max-h-[32rem]"
      alt="ویدیو موجود نیست"
    />
  );

  return (
    <div className="w-full space-y-9">
      <div className="rounded-xl overflow-hidden">{renderedComponent}</div>
    </div>
  );
}
