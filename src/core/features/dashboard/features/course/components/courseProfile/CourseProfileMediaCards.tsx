import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { VideoCustom } from '@/core/components/custom/ui/VideoCustom';
import { Card } from '@/core/components/shadcn/ui/card';
import { cn } from '@/core/utils';
import { CourseProfileData } from '../../courseProfileType';

export const CourseProfileVideoCards = ({ profileData }: { profileData: CourseProfileData }) => (
  <Card className="py-0 overflow-hidden h-72">
    <VideoCustom
      poster={profileData.courseImage || null}
      src={profileData.videoSrc || null}
      className="size-full"
      controls
      allowDownload
    />
  </Card>
);

export const CourseProfileImageCards = ({ profileData }: { profileData: CourseProfileData }) => (
  <Card className="relative overflow-hidden h-72 py-0 w-full">
    <ImgNormalCustom
      fill
      className="object-cover"
      alt="تصویر دوره"
      src={profileData?.courseImage}
      placeholder="empty"
    />
  </Card>
);

export const CourseProfileMediaCards = ({
  profileData,
  className,
}: {
  profileData: CourseProfileData;
  className?: string;
}) => (
  <div className={cn('w-full space-y-5', className)}>
    <CourseProfileImageCards profileData={profileData} />
    <CourseProfileVideoCards profileData={profileData} />
  </div>
);
