import { LabelCustom } from '@/core/components/custom/ui/LabelCustom';
import { Textarea } from '@/core/components/shadcn/ui/textarea';
import { cn } from '@/core/utils';
import { CourseProfileData } from '../../courseProfileType';

export const CourseProfilePrerequisites = ({
  prerequisites,
}: {
  prerequisites: CourseProfileData['prerequisites'];
}) => (
  <div>
    <LabelCustom classNameLabel="cursor-auto">پیشنیاز های دوره</LabelCustom>
    <Textarea className="resize-none min-h-32" value={prerequisites} readOnly />
  </div>
);

export const CourseProfileStatus = ({
  statusDescription,
}: {
  statusDescription: CourseProfileData['statusDescription'];
}) => (
  <div>
    <LabelCustom classNameLabel="cursor-auto">درباره وضعیت دوره</LabelCustom>
    <Textarea className="resize-none min-h-32" value={statusDescription} readOnly />
  </div>
);

export const CourseProfileAbout = ({ about }: { about: CourseProfileData['about'] }) => (
  <div>
    <LabelCustom classNameLabel="cursor-auto">درباره دوره</LabelCustom>
    <Textarea className="resize-none min-h-52" value={about} readOnly />
  </div>
);

export const CourseProfileAboutFieldsList = ({
  profileData,
  className,
}: {
  profileData: CourseProfileData;
  className?: string;
}) => (
  <section className={cn('w-full space-y-7 pt-12', className)}>
    <CourseProfilePrerequisites prerequisites={profileData.prerequisites} />
    <CourseProfileStatus statusDescription={profileData.statusDescription} />
    <CourseProfileAbout about={profileData.about} />
  </section>
);
